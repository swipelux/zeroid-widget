export const getMainAppUrl = (): string => import.meta.env.VITE_SBT_WIDGET_HOST;
export function filterEventsFromWidget(event: MessageEvent) {
  return event.origin === new URL(getMainAppUrl()).origin;
}
