import { useState, useMemo } from 'react';
import { usePosts, usePost } from '../hooks/use-posts';
import useAppStore from '@/store/app-store';

export default function HomePage() {
  // TanStack Query - Server state (API data)
  const { data: posts, isLoading } = usePosts();

  // Zustand - Client state (UI)
  const { selectedPostId, selectPost, clearSelection, filterEnabled, toggleFilter } = useAppStore();

  // Fetch selected post (TanStack Query triggered by Zustand state)
  const { data: selectedPost } = usePost(selectedPostId);

  // Filter using both: Zustand filter + TanStack Query data
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    return filterEnabled ? posts.filter((p) => p.title.length > 40) : posts;
  }, [posts, filterEnabled]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Smart Money Kid</h1>

        {/* Zustand: Filter toggle */}
        <button
          onClick={toggleFilter}
          className={`mb-4 px-4 py-2 rounded ${filterEnabled ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {filterEnabled ? 'Filter: ON' : 'Filter: OFF'}
        </button>

        {/* TanStack Query: Posts list */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-2">
            {filteredPosts.map((post) => (
              <li
                key={post.id}
                onClick={() => selectPost(post.id)}
                className={`p-3 rounded cursor-pointer ${
                  selectedPostId === post.id ? 'bg-blue-100' : 'bg-white'
                }`}
              >
                #{post.id} - {post.title}
              </li>
            ))}
          </ul>
        )}

        {/* Selected post detail (Zustand triggers TanStack Query) */}
        {selectedPost && (
          <div className="mt-4 p-4 bg-green-50 rounded">
            <div className="flex justify-between">
              <strong>{selectedPost.title}</strong>
              <button onClick={clearSelection}>✕</button>
            </div>
            <p className="text-sm mt-2">{selectedPost.body}</p>
          </div>
        )}
      </div>
    </div>
  );
}
