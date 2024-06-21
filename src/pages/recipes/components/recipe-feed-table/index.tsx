import DataTable from '@/components/shared/data-table';
import RecipeTableActions from '@/pages/recipes/components/recipe-feed-table/recipe-table-action';
import { columns } from './columns';


type TRecipesTableProps = {
  users: any;
  page: number;
  totalUsers: number;
  pageCount: number;
};

export default function RecipeFeedTable({
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
