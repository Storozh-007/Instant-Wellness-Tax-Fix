
import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ImportFormProps {
  onImportSuccess: () => void;
}

export default function ImportForm({ onImportSuccess }: ImportFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/orders/import', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Import failed');

      const data = await res.json();
      setMessage({ type: 'success', text: data.message || 'Import successful' });
      setFile(null);
      onImportSuccess();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to import CSV. Please check the format.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Upload className="w-5 h-5 text-blue-600" />
        Import Orders CSV
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
            id="csv-upload"
          />
          <label htmlFor="csv-upload" className="cursor-pointer flex flex-col items-center gap-2">
            {file ? (
              <div className="text-green-600 font-medium flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                {file.name}
              </div>
            ) : (
              <>
                <span className="text-gray-500">Click to upload or drag and drop</span>
                <span className="text-xs text-gray-400">CSV format: id, longitude, latitude, timestamp, subtotal</span>
              </>
            )}
          </label>
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={!file || loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? 'Processing...' : 'Upload & Process'}
        </button>
      </form>
    </div>
  );
}
