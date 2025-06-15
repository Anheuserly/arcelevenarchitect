import { useQuery } from '@tanstack/react-query';
import { instagramService } from '../services/instagramService';

export const useInstagramData = (filters = {}) => {
  const { type, limit = 50, searchTerm } = filters;

  return useQuery({
    queryKey: ['instagram-posts', filters],
    queryFn: async () => {
      if (searchTerm) {
        return await instagramService.searchPosts(searchTerm, limit);
      }
      if (type && type !== 'all') {
        return await instagramService.getPostsByType(type, limit);
      }
      return await instagramService.getInstagramPosts(limit);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

// Hook for statistics
export const useInstagramStats = () => {
  return useQuery({
    queryKey: ['instagram-stats'],
    queryFn: () => instagramService.getStatistics(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};
