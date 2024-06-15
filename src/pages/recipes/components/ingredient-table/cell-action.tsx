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
import { Ingredients } from '@/constants/data';
import { updateIngredientsList } from '@/lib/recipes-api';
import IngredientsUpdateForm from '@/pages/recipes/components/ingredients-forms/ingredient-update-form';
import { useGetDetailIngredients } from '@/pages/recipes/queries/queries';
import { useQueryClient } from '@tanstack/react-query';
import { MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface CellActionProps {
  data: Ingredients;
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const recipeIdParam = useParams().recipeId;
  const recipeId = Number(recipeIdParam);
  const { data: detailsIngredient } = useGetDetailIngredients(recipeId);
  const queryClient = useQueryClient();

  const onConfirm = async () => {
    const updatedDetailsIngredient = detailsIngredient.filter(
      (item) => item !== data
    );
    const ingredients = { ingredients: updatedDetailsIngredient };
    await updateIngredientsList(recipeId, ingredients);
    setOpen(false);
  };

  const onUpdateIngredient = async (values) => {
    const updatedValues = {
      ...values,
      quantity: Number(values.quantity)
    };

    const updatedDetailsIngredient = detailsIngredient
      .filter((item) => item !== data)
      .concat(updatedValues);
    const ingredients = { ingredients: updatedDetailsIngredient };
    const res = await updateIngredientsList(recipeId, ingredients);
    queryClient.invalidateQueries({ queryKey: ['ingredients', recipeId] });
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
            onSelect={(e) => {
              e.preventDefault();
            }}
          // onClick={() => router.push(`/dashboard/user/${data.id}`)}
          >
            <PopupUpdateModal
              renderModal={(onClose) => (
                <IngredientsUpdateForm
                  modalClose={onClose}
                  data={data}
                  onUpdateIngredient={onUpdateIngredient}
                />
              )}
            />
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
