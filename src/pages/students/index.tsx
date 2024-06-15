import PageHead from '@/components/shared/page-head';
import { useGetUsers } from './queries/queries';
import StudentsTable from './components/students-table';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { useEffect } from 'react';

export default function StudentPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  // const offset = (page - 1) * pageLimit;
  const { data, isLoading } = useGetUsers(page, pageLimit);
  const users = data?.content;
  const totalUsers = data?.totalElements;
  const pageCount = Math.ceil(totalUsers / pageLimit);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching users', users);
    };
    fetchData();
  }, [users])

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
      <PageHead title="User Management | App" />
      <StudentsTable
        users={users}
        page={page}
        totalUsers={totalUsers}
        pageCount={pageCount}
      />
    </div>
  );
}
