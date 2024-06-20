import { AlertModal } from '@/components/shared/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Edit, LockKeyhole, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from '@/routes/hooks';
import { useEffect, useState } from 'react';
import { Account } from '@/constants/data';
import { lockProfile } from '@/lib/users-api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';


interface CellActionProps {
  data: Account;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const queryClient = useQueryClient();

  const onConfirm = async () => {
    const type = data.isActive ? 'lock' : 'unlock';
    await lockProfile(data.userId, type);
    queryClient.invalidateQueries({ queryKey: ['users'] });
    setOpen(false);
    toast.success('Account updated successfully!')
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}

      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/account/details/${data.userId}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Detail
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <LockKeyhole className="mr-2 h-4 w-4" /> {data.isActive ? 'Lock' : 'Unlock'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
