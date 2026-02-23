
import express, { Request, Response } from 'express';
import multer from 'multer';
import { parse } from 'csv-parse';
import db from './db';
import { calculateTax } from './taxService';
import { Readable } from 'stream';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// GET /orders
router.get('/orders', (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = (page - 1) * limit;

    const stmt = db.prepare('SELECT * FROM orders ORDER BY id DESC LIMIT ? OFFSET ?');
    const orders = stmt.all(limit, offset);

    const countStmt = db.prepare('SELECT COUNT(*) as count FROM orders');
    const total = countStmt.get() as { count: number };

    res.json({
      data: orders,
      pagination: {
        page,
        limit,
        total: total.count,
        totalPages: Math.ceil(total.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// POST /orders (Manual Create)
router.post('/orders', (req: Request, res: Response) => {
  try {
    const { latitude, longitude, subtotal, timestamp } = req.body;

    if (!latitude || !longitude || !subtotal) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const taxResult = calculateTax({ latitude, longitude }, subtotal);
    const orderTimestamp = timestamp || new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO orders (
        latitude, longitude, subtotal, timestamp,
        composite_tax_rate, tax_amount, total_amount,
        state_rate, county_rate, city_rate, special_rates,
        jurisdiction_name
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const info = stmt.run(
      latitude, longitude, subtotal, orderTimestamp,
      taxResult.composite_tax_rate, taxResult.tax_amount, taxResult.total_amount,
      taxResult.breakdown.state_rate, taxResult.breakdown.county_rate, taxResult.breakdown.city_rate, taxResult.breakdown.special_rates,
      taxResult.jurisdictions.name
    );

    res.json({
      id: info.lastInsertRowid,
      latitude, longitude, subtotal, timestamp: orderTimestamp,
      ...taxResult
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// POST /orders/import (CSV Import)
router.post('/orders/import', upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  const results: any[] = [];
  const stream = Readable.from(req.file.buffer.toString());

  const parser = stream.pipe(parse({
    columns: true,
    skip_empty_lines: true,
    trim: true
  }));

  const insertStmt = db.prepare(`
    INSERT INTO orders (
      latitude, longitude, subtotal, timestamp,
      composite_tax_rate, tax_amount, total_amount,
      state_rate, county_rate, city_rate, special_rates,
      jurisdiction_name
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((orders: any[]) => {
    for (const order of orders) {
      insertStmt.run(
        order.latitude, order.longitude, order.subtotal, order.timestamp,
        order.composite_tax_rate, order.tax_amount, order.total_amount,
        order.state_rate, order.county_rate, order.city_rate, order.special_rates,
        order.jurisdiction_name
      );
    }
  });

  try {
    for await (const record of parser) {
      // CSV columns: id,longitude,latitude,timestamp,subtotal
      const lat = parseFloat(record.latitude);
      const lon = parseFloat(record.longitude);
      const sub = parseFloat(record.subtotal);
      const ts = record.timestamp;

      if (isNaN(lat) || isNaN(lon) || isNaN(sub)) continue;

      const taxResult = calculateTax({ latitude: lat, longitude: lon }, sub);

      results.push({
        latitude: lat,
        longitude: lon,
        subtotal: sub,
        timestamp: ts,
        composite_tax_rate: taxResult.composite_tax_rate,
        tax_amount: taxResult.tax_amount,
        total_amount: taxResult.total_amount,
        state_rate: taxResult.breakdown.state_rate,
        county_rate: taxResult.breakdown.county_rate,
        city_rate: taxResult.breakdown.city_rate,
        special_rates: taxResult.breakdown.special_rates,
        jurisdiction_name: taxResult.jurisdictions.name
      });
    }

    insertMany(results);

    res.json({ message: `Successfully imported ${results.length} orders.` });
  } catch (error) {
    console.error('Error processing CSV:', error);
    res.status(500).json({ error: 'Failed to process CSV' });
  }
});

export default router;
