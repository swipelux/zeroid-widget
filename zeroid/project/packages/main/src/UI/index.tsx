import ReactDOM from 'react-dom/client';
import React from 'react';
import { Widget } from './DefaultWidget.tsx';
import { WidgetNano } from './NanoWidget.tsx';
import { StorageWidget, StorageButton } from './StorageWidget.tsx';

type Variant = 'default' | 'nano' | 'storageForm' | 'storage';

const WidgetMap: Record<Variant, React.FC> = {
  default: Widget,
  nano: WidgetNano,
  storageForm: StorageWidget,
  storage: StorageButton,
};

export function renderUi(variant: Variant = 'default') {
  const Component = WidgetMap[variant];

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Component />
    </React.StrictMode>
  );
}
