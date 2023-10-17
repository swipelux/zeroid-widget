import './global.d.ts';
import { renderUi } from './UI';
import { response } from './registerAPI.ts';

if (location.pathname === '/zero_id.html') {
  window.addEventListener('message', (event) => {
    if (event.data.type === 'init_sdk') {
      const variant = event.data.payload as
        | 'default'
        | 'nano'
        | 'storage'
        | 'storageForm';
      renderUi(variant);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      response.send('close_storage_form_modal');
    }
  });
} else {
  renderUi();
}
