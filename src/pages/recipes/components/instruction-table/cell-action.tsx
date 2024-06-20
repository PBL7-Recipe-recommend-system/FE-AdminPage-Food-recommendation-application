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
import { toast } from 'sonner';

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
    toast.success('Instruction deleted successfully');
  };
  const onUpdateInstruction = async (values) => {
    console.log(values);
    await updateInstruction(recipeId, values);
    queryClient.invalidateQueries({ queryKey: ['instructions', recipeId] });
    toast.success('Instruction updated successfully');
  };
  return (
    <div className='flex flex-row items-center justify-center'>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      <PopupUpdateModal
        renderModal={(onClose) => (
          <InstructionUpdateForm modalClose={onClose} data={data} onUpdateInstruction={onUpdateInstruction} />
        )}
      />
      <Trash className="m-2 h-5 w-5 cursor-pointer" onClick={() => setOpen(true)} />

    </div>
  );
};
