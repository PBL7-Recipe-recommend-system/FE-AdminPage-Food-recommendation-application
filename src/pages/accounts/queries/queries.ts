import { getDetailedUser, getUsers } from '@/lib/users-api';
import { useQuery } from '@tanstack/react-query';

export const useGetUsers = (page, size) => {
  return useQuery({
    queryKey: ['users', page, size],
    queryFn: async () => getUsers(page, size)
  });
};

export const useGetDetailedUser = (id) => {
  return useQuery({
    queryKey: ['detailedUser', id],
    queryFn: async () => getDetailedUser(id)
  });
};
