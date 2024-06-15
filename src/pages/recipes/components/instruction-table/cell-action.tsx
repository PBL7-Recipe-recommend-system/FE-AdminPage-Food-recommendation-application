import { AlertModal } from '@/components/shared/alert-modal';
import PopupUpdateModal from '@/components/shared/popup-edit-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Instruction } from '@/constants/data';
import { deleteInstruction, updateInstruction } from '@/lib/instructions-api';
import InstructionUpdateForm from '@/pages/recipes/components/instruction-forms/instruction-update-form';
import { useQueryClient } from '@tanstack/react-query';
import { MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface CellActionProps {
  data: Instruction;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const recipeIdParam = useParams().recipeId;
  const recipeId = Number(recipeIdParam);
  const queryClient = useQueryClient();

  const onConfirm = async () => {
    await deleteInstruction(recipeId, data.step);
    queryClient.invalidateQueries({ queryKey: ['instructions', recipeId] });
    setOpen(false);
  };



  const onUpdateInstruction = async (values) => {
    console.log(values);
    await updateInstruction(recipeId, values);
    queryClient.invalidateQueries({ queryKey: ['instructions', recipeId] });
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <PopupUpdateModal
              renderModal={(onClose) => (
                <InstructionUpdateForm modalClose={onClose} data={data} onUpdateInstruction={onUpdateInstruction} />
              )}
            />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
