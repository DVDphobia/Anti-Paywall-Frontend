'use client';

import { useEffect, useState } from 'react';
import { search } from '@/services/api';
import { SearchHistory } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import toast from 'react-hot-toast';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function History() {
  const [searches, setSearches] = useState<SearchHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchHistory = async () => {
    try {
      const { searches: data, pagination } = await search.getHistory(page);
      setSearches(prev => page === 1 ? data : [...prev, ...data]);
      setHasMore(pagination.hasMore);
    } catch (error) {
      toast.error('Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await search.deleteHistoryEntry(id);
      setSearches(prev => prev.filter(item => item._id !== id));
      toast.success('Entry deleted');
    } catch (error) {
      toast.error('Failed to delete entry');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [page]);

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Search History</h1>

        {loading && page === 1 ? (
          <p>Loading...</p>
        ) : searches.length === 0 ? (
          <p>No search history found</p>
        ) : (
          <div className="space-y-4">
            {searches.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-4 bg-white rounded shadow"
              >
                <div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {item.url}
                  </a>
                  <p className="text-sm text-gray-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
                
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            ))}

            {hasMore && (
              <button
                onClick={() => setPage(prev => prev + 1)}
                className="w-full p-2 text-blue-500 hover:bg-blue-50 rounded"
              >
                Load More
              </button>
            )}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 