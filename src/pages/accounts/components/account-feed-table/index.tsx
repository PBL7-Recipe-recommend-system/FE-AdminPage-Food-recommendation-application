import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import AccountTableActions from './account-table-action';

type TAccountsTableProps = {
  users: any;
  page: number;
  totalUsers: number;
  pageCount: number;
};

export default function StudentFeedTable({
  users,
  pageCount
}: TAccountsTableProps) {
  return (
    <>
      <AccountTableActions />
      {users && (
        <DataTable columns={columns} data={users} pageCount={pageCount} />
      )}
    </>
  );
}
