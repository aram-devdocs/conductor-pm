import { useQuery } from '@tanstack/react-query';
import { dataEndpoints } from '../../api/data/client';
import type { DataType } from '../../api/data/types';
import { useToast } from '../../contexts/ToastContext';

export const useData = (type: DataType) => {
  const { showErrorToast } = useToast();

  const query = useQuery({
    queryKey: type === 'users' ? dataEndpoints.users.queryKey() : dataEndpoints.sprint.queryKey(),
    queryFn: async () => {
      try {
        return type === 'users' 
          ? await dataEndpoints.users.createRequest()
          : await dataEndpoints.sprint.createRequest();
      } catch (error) {
        showErrorToast(error.message || 'Failed to fetch data. Please try again.');
        throw error;
      }
    },
  });

  return {
    data: query.data?.results || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}; 