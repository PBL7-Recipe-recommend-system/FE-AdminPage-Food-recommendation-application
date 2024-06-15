import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import IngredientTableActions from '@/pages/recipes/components/ingredient-table/ingredient-table-action';
import { useState } from 'react';

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
    const [isSearching, setIsSearching] = useState(false);
    const [dataSearch, setDataSearch] = useState([]);
    return (
        <>
            <IngredientTableActions />
            {ingredients && (
                <DataTable columns={columns} data={isSearching ? dataSearch : ingredients} pageCount={pageCount} showRowPerPage={false} />
            )}
        </>
    );
}
