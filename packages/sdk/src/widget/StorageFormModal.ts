import { Message } from 'transport';
import { createModal } from '../ui/createModal.ts';
import { initByVariant } from './initZeroId.ts';

const storageForm: {
  open: () => void;
  close: () => void;
  created: boolean;
} = {
  open: () => {},
  close: () => {},
  created: false,
};

function createStorageForm() {
  const { openModal, closeModal, root } = createModal();
  initByVariant('storageForm')(root);
  storageForm.open = openModal;
  storageForm.close = closeModal;
  storageForm.created = true;
}

function openStorageForm() {
  if (!storageForm.created) {
    createStorageForm();
  }
  storageForm.open();
}

function closeStorageForm() {
  storageForm.close();
}

export function manageStorageFormModal(message: Message) {
  switch (message.type) {
    case 'open_storage_form_modal':
      openStorageForm();
      break;
    case 'close_storage_form_modal':
      closeStorageForm();
      break;
    default:
      break;
  }
}
