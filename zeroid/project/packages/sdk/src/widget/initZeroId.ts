import { createWidgetIframe } from '../ui/createIframe.ts';
import { filterEventsFromWidget, getMainAppUrl } from '../utils.ts';
import { CrossDomainMessenger, AsyncRequest } from 'transport';
import { Widget } from './Widget.ts';
import { manageStorageFormModal } from './StorageFormModal.ts';

export type WidgetVariant =
  | 'nano'
  | 'default'
  | 'invisible'
  | 'storage'
  | 'storageForm';

function initZeroId(variant: WidgetVariant, element: HTMLElement) {
  if (!element) {
    throw new Error('Root element is not defined');
  }

  const iframe = createWidgetIframe(getMainAppUrl(), variant);

  element.appendChild(iframe);

  const crossDomainMessenger = new CrossDomainMessenger(
    iframe,
    filterEventsFromWidget
  );

  iframe.onload = function () {
    crossDomainMessenger.send({ type: 'init_sdk', payload: variant });
  };

  crossDomainMessenger.subscribe(manageStorageFormModal);

  return new Widget(new AsyncRequest(crossDomainMessenger));
}

export const initByVariant =
  (variant: WidgetVariant) => (element: HTMLElement) => {
    return initZeroId(variant, element);
  };
