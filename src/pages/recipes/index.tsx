import PageHead from '@/components/shared/page-head';

import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipesTable from '@/pages/recipes/components/recipes-table/index';
import { useGetRecipes } from '@/pages/recipes/queries/queries';

export default function RecipePage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  // const offset = (page - 1) * pageLimit;
  const { data, isLoading } = useGetRecipes(page, pageLimit);
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
      <PageHead title="User Management | App" />
      <RecipesTable
        users={users}
        page={page}
        totalUsers={totalUsers}
        pageCount={pageCount}
      />
    </div>
  );
}
