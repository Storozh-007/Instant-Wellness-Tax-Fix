
import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';

interface ManualFormProps {
  onOrderCreated: () => void;
}

export default function ManualForm({ onOrderCreated }: ManualFormProps) {
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    subtotal: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
          subtotal: parseFloat(formData.subtotal)
        }),
      });

      if (res.ok) {
        setFormData({ latitude: '', longitude: '', subtotal: '' });
        onOrderCreated();
      }
    } catch (error) {
      console.error('Failed to create order', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-emerald-600" />
        Manual Entry
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Latitude</label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="40.7128"
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Longitude</label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="-74.0060"
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Subtotal ($)</label>
          <input
            type="number"
            step="0.01"
            name="subtotal"
            value={formData.subtotal}
            onChange={handleChange}
            placeholder="0.00"
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Calculate & Save
        </button>
      </form>
    </div>
  );
}
