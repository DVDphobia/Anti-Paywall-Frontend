'use client';

import { useEffect, useState } from 'react';
import { search } from '@/services/api';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const data = await search.getHistory();
      setHistory(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);  // fetchHistory is stable, no need to add as dependency

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {history.map((item: any) => (
            <li key={item._id} className="border p-4 rounded">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 