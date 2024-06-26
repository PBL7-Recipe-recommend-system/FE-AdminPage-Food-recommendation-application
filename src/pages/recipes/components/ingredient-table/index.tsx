import DataTable from '@/components/shared/data-table';
import IngredientTableActions from '@/pages/recipes/components/ingredient-table/ingredient-table-action';
import { useState } from 'react';
import { columns } from './columns';

type TRecipesTableProps = {
    ingredients: any;
    page: number;
    totalUsers: number;
    pageCount: number;
};

export default function IngredientsTable({
    ingredients,
    pageCount
}: TRecipesTableProps) {
    const [isSearching] = useState(false);
    const [dataSearch] = useState([]);
    return (
        <>
            <IngredientTableActions />
            {ingredients && (
                <DataTable columns={columns} data={isSearching ? dataSearch : ingredients} pageCount={pageCount} showRowPerPage={false} />
            )}
        </>
    );
}
