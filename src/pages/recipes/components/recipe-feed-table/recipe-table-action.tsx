import PopupModal from '@/components/shared/popup-modal';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';
import StudentCreateForm from '../recipe-forms/recipe-create-form';

export default function RecipeTableActions() {
  return (
    <div className="flex items-center justify-between py-5">
      {/* <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search Recipe Here" />
      </div> */}
      <div className="flex gap-3">
        <Button>
          <DownloadIcon className="h-6 w-6" />
          Download CSV
        </Button>

        <PopupModal
          renderModal={(onClose) => <StudentCreateForm modalClose={onClose} />}
        />
      </div>
    </div>
  );
}
