
import { Order, Pagination } from '../types';
import { ChevronLeft, ChevronRight, MapPin, DollarSign } from 'lucide-react';

interface OrderTableProps {
  orders: Order[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

export default function OrderTable({ orders, pagination, onPageChange }: OrderTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">ID</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Location</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Jurisdiction</th>
              <th className="px-6 py-4 font-semibold text-gray-700 text-right">Subtotal</th>
              <th className="px-6 py-4 font-semibold text-gray-700 text-right">Tax Rate</th>
              <th className="px-6 py-4 font-semibold text-gray-700 text-right">Tax Amt</th>
              <th className="px-6 py-4 font-semibold text-gray-700 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-gray-500 font-mono">#{order.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs font-mono">
                      {order.latitude.toFixed(4)}, {order.longitude.toFixed(4)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {order.jurisdiction_name}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-medium text-gray-900">
                  ${order.subtotal.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right text-gray-500">
                  {(order.composite_tax_rate * 100).toFixed(3)}%
                </td>
                <td className="px-6 py-4 text-right text-red-600 font-medium">
                  +${order.tax_amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right font-bold text-emerald-600">
                  ${order.total_amount.toFixed(2)}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                  No orders found. Import a CSV or create one manually.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{orders.length}</span> of <span className="font-medium">{pagination.total}</span> orders
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {pagination.page} of {pagination.totalPages || 1}
          </span>
          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
