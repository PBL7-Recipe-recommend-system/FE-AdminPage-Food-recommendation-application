import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import PageHead from '@/components/shared/page-head';
import { useSearchParams } from 'react-router-dom';
import { useGetUsers } from './queries/queries';
import AccountsTable from '@/pages/accounts/components/accounts-table';

export default function StudentPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  // const offset = (page - 1) * pageLimit;
  const { data, isLoading } = useGetUsers(page, pageLimit);
  const users = data?.content;
  const totalUsers = data?.totalElements;
  const pageCount = Math.ceil(totalUsers / pageLimit);



  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton
          columnCount={10}
          filterableColumnCount={2}
          searchableColumnCount={1}
        />
      </div>
    );
  }

  return (
    <div className="p-5">
      <PageHead title="User Management | FRA" />
      <AccountsTable
        users={users}
        page={page}
        totalUsers={totalUsers}
        pageCount={pageCount}
      />
    </div>
  );
}
