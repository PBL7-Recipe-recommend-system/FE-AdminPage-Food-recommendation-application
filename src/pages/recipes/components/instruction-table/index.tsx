import DataTable from '@/components/shared/data-table';
import InstructionTableActions from '@/pages/recipes/components/instruction-table/instruction-table-action';
import { columns } from './columns';

type TRecipesTableProps = {
    instructions: any;
    page: number;
    totalUsers: number;
    pageCount: number;
};

export default function InstructionTable({
    instructions,
    pageCount
}: TRecipesTableProps) {
    return (
        <>

            <InstructionTableActions />
            {instructions && (
                <DataTable columns={columns} data={instructions} pageCount={pageCount} showRowPerPage={false} />
            )}
        </>
    );
}
