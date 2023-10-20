import { applyStyles, IframeStyles, Layout } from './createIframe.ts';

const MODAL_Z_INDEX = 9999;
const BACKDROP_Z_INDEX = MODAL_Z_INDEX - 1;

export function createModal(layout: Layout = 'default') {
  // create backdrop
  const backdrop = document.createElement('div');
  backdrop.style.display = 'none';
  backdrop.style.position = 'fixed';
  backdrop.style.top = '0';
  backdrop.style.left = '0';
  backdrop.style.width = '100%';
  backdrop.style.height = '100%';
  backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  backdrop.style.zIndex = `${BACKDROP_Z_INDEX}`;

  // create modal window
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.style.display = 'none';
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.backgroundColor = '#fff';
  modal.style.zIndex = `${MODAL_Z_INDEX}`;

  // create modal window content
  const modalContent = document.createElement('div');
  modalContent.style.textAlign = 'center';

  applyStyles(modal, IframeStyles[layout]);
  modal.appendChild(modalContent);
  document.body.appendChild(backdrop);
  document.body.appendChild(modal);

  const openModal = function () {
    modal.style.display = 'block';
    backdrop.style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

  const closeModal = function () {
    modal.style.display = 'none';
    backdrop.style.display = 'none';
    document.body.style.overflow = 'auto';
  };

  backdrop.addEventListener('click', function (event) {
    if (event.target === backdrop) {
      closeModal();
    }
  });

  return { openModal, closeModal, root: modalContent };
}
