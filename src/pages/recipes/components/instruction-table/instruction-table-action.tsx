import PopupModal from '@/components/shared/popup-modal';
import InstructionCreateForm from '@/pages/recipes/components/instruction-forms/instruction-create-form';

export default function InstructionTableActions() {
  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex flex-1 gap-4">
        {/* <TableSearchInput placeholder="Search Step Here" /> */}
      </div>
      <div className="flex gap-3">
        <PopupModal
          renderModal={(onClose) => <InstructionCreateForm modalClose={onClose} />}
        />
      </div>
    </div>
  );
}
