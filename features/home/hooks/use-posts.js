import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

// GET - Fetch all posts
export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      // Using JSONPlaceholder as demo API
      const response = await api.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
      return response.data;
    },
  });
}

// GET - Fetch single post
export function usePost(id) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const response = await api.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return response.data;
    },
    enabled: !!id, // Only fetch if id exists
  });
}

// POST - Create new post
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPost) => {
      const response = await api.post('https://jsonplaceholder.typicode.com/posts', newPost);
      return response.data;
    },
    onSuccess: () => {
      // Refresh posts list after creating
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
