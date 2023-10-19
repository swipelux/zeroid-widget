import { WidgetVariant } from '../widget/initZeroId.ts';

export type Layout = 'nano' | 'default' | 'invisible';

export const IframeStyles: Record<Layout, Partial<CSSStyleDeclaration>> = {
  nano: {
    border: 'none',
    height: '64px',
    width: '300px',
    borderRadius: '8px',
  },
  default: {
    border: 'none',
    height: '602px',
    width: '400px',
    borderRadius: '24px',
  },
  invisible: {
    border: 'none',
    height: '0px',
    width: '0px',
    position: 'absolute',
    top: '-1000px',
    left: '-1000px',
  },
};

const VariantToLayout: Record<WidgetVariant, Layout> = {
  nano: 'nano',
  default: 'default',
  invisible: 'invisible',
  storage: 'nano',
  storageForm: 'default',
};

export const applyStyles = (
  element: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
) => {
  const stylesArray = Object.entries(styles) as Array<
    [keyof Omit<CSSStyleDeclaration, 'length'>, string]
  >;

  for (const [key, value] of stylesArray) {
    // @ts-ignore
    element.style[key] = value;
  }
};

export const createWidgetIframe = (
  url: string,
  variant: WidgetVariant = 'default'
) => {
  const iframe = document.createElement('iframe');
  iframe.src = url;

  applyStyles(iframe, IframeStyles[VariantToLayout[variant]]);

  iframe.allow = 'camera *;microphone *; clipboard-read; clipboard-write';
  return iframe;
};
