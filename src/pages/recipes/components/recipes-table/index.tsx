import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import RecipeTableActions from '@/pages/recipes/components/recipes-table/recipe-table-action';
type TRecipesTableProps = {
  users: any;
  page: number;
  totalUsers: number;
  pageCount: number;
};

export default function RecipesTable({
  users,
  pageCount
}: TRecipesTableProps) {
  return (
    <>
      <RecipeTableActions />
      {users && (
        <DataTable columns={columns} data={users} pageCount={pageCount} />
      )}
    </>
  );
}
