import DataTable from '@/components/shared/data-table';
import { Toaster } from 'sonner';
import AccountTableActions from './account-table-action';
import { columns } from './columns';


type TAccountTableProps = {
  users: any;
  page: number;
  totalUsers: number;
  pageCount: number;
};

export default function AccountsTable({
  users,
  pageCount
}: TAccountTableProps) {
  return (
    <>
      <Toaster richColors position="top-right" />
      <AccountTableActions />
      {users && (
        <DataTable columns={columns} data={users} pageCount={pageCount} />
      )}
    </>
  );
}
