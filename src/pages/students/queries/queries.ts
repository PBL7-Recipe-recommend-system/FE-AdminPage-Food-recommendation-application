import { useQuery } from '@tanstack/react-query';
import { getUsers, getDetailedUser } from '@/lib/users-api';

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
