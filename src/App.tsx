
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import ImportForm from './components/ImportForm';
import ManualForm from './components/ManualForm';
import OrderTable from './components/OrderTable';
import { Order, Pagination } from './types';
import { Box } from 'lucide-react';

export default function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 1
  });
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders?page=${page}&limit=${pagination.limit}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
              <Box className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Instant Wellness Tax Fix</h1>
          </div>
          <div className="text-sm text-gray-500">
            Admin Dashboard
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ImportForm onImportSuccess={() => fetchOrders(1)} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ManualForm onOrderCreated={() => fetchOrders(1)} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-emerald-600 rounded-xl p-6 text-white shadow-lg shadow-emerald-200"
          >
            <h3 className="text-lg font-semibold mb-2">System Status</h3>
            <div className="space-y-4">
              <div>
                <div className="text-emerald-100 text-sm mb-1">Total Orders Processed</div>
                <div className="text-3xl font-bold">{pagination.total}</div>
              </div>
              <div className="h-px bg-emerald-500/50" />
              <div className="text-sm text-emerald-100">
                All tax calculations are performed automatically based on NY State jurisdiction rules using geospatial analysis.
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            {loading && <span className="text-sm text-gray-500 animate-pulse">Refreshing...</span>}
          </div>
          <OrderTable 
            orders={orders} 
            pagination={pagination} 
            onPageChange={(page) => fetchOrders(page)} 
          />
        </motion.div>
      </main>
    </div>
  );
}
