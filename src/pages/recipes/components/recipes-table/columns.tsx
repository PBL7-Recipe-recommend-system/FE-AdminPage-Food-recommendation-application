import { Recipe } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Recipe>[] = [
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'authorName',
    header: 'AUTHOR NAME'
  },
  {
    accessorKey: 'totalTime',
    header: 'TOTAL TIME'
  },
  {
    accessorKey: 'calories',
    header: 'CALORIES'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
