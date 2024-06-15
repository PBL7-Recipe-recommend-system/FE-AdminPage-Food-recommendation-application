import { Modal } from '@/components/ui/modal';
import { Edit, Plus } from 'lucide-react';
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';

type TPopupModalProps = {
  onConfirm?: () => void;
  loading?: boolean;
  renderModal: (onClose: () => void) => React.ReactNode;
};
export default function PopupUpdateModal({ renderModal }: TPopupModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  return (
    <>
      <div
        style={{
          cursor: 'pointer',
          width: '100%',
          display: 'flex'
        }}
        onClick={() => {
          setIsOpen(true);
        }}
        className={'text-xs md:text-sm'}
      >
        <Edit className="mr-2 h-4 w-4" /> Update
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className={'h-auto !bg-background !px-1'}
      >
        <ScrollArea className="h-auto px-6">
          {renderModal(onClose)}
        </ScrollArea>
      </Modal>
    </>
  );
}
