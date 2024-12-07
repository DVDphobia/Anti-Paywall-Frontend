'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { search } from '@/services/api';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { NewspaperIcon } from '@heroicons/react/24/outline';
import Advertisement from '@/components/Advertisement';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    try {
      setLoading(true);
      setContent(''); // Clear previous content
      
      const result = await search.bypass(url);
      
      if (result?.content) {
        setContent(result.content);
      } else {
        setError('No content found');
        toast.error('No content found');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to bypass paywall');
      toast.error(error instanceof Error ? error.message : 'Failed to bypass paywall');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <NewspaperIcon className="h-16 w-16 mx-auto mb-4 dark:text-white" />
        <h1 className="text-3xl font-bold mb-4 dark:text-white">Bypass Paywall</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Access articles behind paywalls with ease. Simply paste the URL below and
          we'll retrieve the content for you.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://hasinisama.medium.com/building-your-own-operating-system-980a449810v"
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Bypass'}
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center py-4 dark:text-white">
          <p>Loading article content...</p>
        </div>
      )}

      {error && (
        <div className="text-red-500 dark:text-red-400 text-center py-4">
          {error}
        </div>
      )}

      {content && (
        <div className="bypassed-content">
          <Advertisement slot="XXXXXXXX" />
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <Advertisement slot="XXXXXXXX" />
        </div>
      )}
    </div>
  );
}
