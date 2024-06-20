import { AlertModal } from '@/components/shared/alert-modal';
import PopupUpdateModal from '@/components/shared/popup-edit-modal';
import { Ingredients } from '@/constants/data';
import { updateIngredientsList } from '@/lib/recipes-api';
import IngredientsUpdateForm from '@/pages/recipes/components/ingredients-forms/ingredient-update-form';
import { useGetDetailIngredients } from '@/pages/recipes/queries/queries';
import { useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

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
    toast.success('Ingredient deleted successfully');
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
    await updateIngredientsList(recipeId, ingredients);
    queryClient.invalidateQueries({ queryKey: ['ingredients', recipeId] });
    toast.success('Ingredient updated successfully');
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
          <IngredientsUpdateForm
            modalClose={onClose}
            data={data}
            onUpdateIngredient={onUpdateIngredient}
          />
        )}
      />
      <Trash className="ml-4 h-5 w-5 cursor-pointer" onClick={() => {
        setOpen(true);
      }} />

    </div>
  );
};
