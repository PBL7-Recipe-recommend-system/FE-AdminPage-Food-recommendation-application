import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/lib/users-api';

export const useGetUsers = (page, size) => {
  return useQuery({
    queryKey: ['students', page, size],
    queryFn: async () => getUsers(page, size)
  });
};
