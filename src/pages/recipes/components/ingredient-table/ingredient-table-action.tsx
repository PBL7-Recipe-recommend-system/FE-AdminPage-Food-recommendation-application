import PopupModal from '@/components/shared/popup-modal';
import TableSearchInput from '@/components/shared/table-search-input';
import IngredientsCreateForm from '@/pages/recipes/components/ingredients-forms/ingredient-create-form';

export default function IngredientTableActions() {
  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search Ingredient Here" />
      </div>
      <div className="flex gap-3">
        <PopupModal
          renderModal={(onClose) => <IngredientsCreateForm modalClose={onClose} />}
        />
      </div>
    </div>
  );
}
