import PopupModal from '@/components/shared/popup-modal';
import AccountCreateForm from '@/pages/accounts/components/account-forms/account-create-form';
export default function AccountTableActions() {
  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex gap-3">
        <PopupModal
          renderModal={(onClose) => <AccountCreateForm modalClose={onClose} />}
        />
      </div>
    </div>
  );
}
