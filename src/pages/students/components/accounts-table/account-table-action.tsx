import PopupModal from '@/components/shared/popup-modal';
import AccountCreateForm from '@/pages/students/components/account-forms/account-create-form';
export default function AccountTableActions() {
  return (
    <div className="flex items-center justify-between py-5">

      {/* <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search Account Here" />
      </div> */}
      <div className="flex gap-3">
        <PopupModal
          renderModal={(onClose) => <AccountCreateForm modalClose={onClose} />}
        />
      </div>
    </div>
  );
}
