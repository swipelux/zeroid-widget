import React from 'react';
interface Props extends React.SVGProps<SVGSVGElement> {}
export function Eye(props: Props) {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.25 9.15005C18.94 5.52005 15.56 3.43005 12 3.43005C10.22 3.43005 8.49 3.95005 6.91 4.92005C5.33 5.90005 3.91 7.33005 2.75 9.15005C1.75 10.7201 1.75 13.2701 2.75 14.8401C5.06 18.4801 8.44 20.5601 12 20.5601C13.78 20.5601 15.51 20.0401 17.09 19.0701C18.67 18.0901 20.09 16.6601 21.25 14.8401C22.25 13.2801 22.25 10.7201 21.25 9.15005ZM12 16.0401C9.76 16.0401 7.96 14.2301 7.96 12.0001C7.96 9.77005 9.76 7.96005 12 7.96005C14.24 7.96005 16.04 9.77005 16.04 12.0001C16.04 14.2301 14.24 16.0401 12 16.0401Z"
        fill="black"
        fillOpacity="0.2"
      />
      <path
        d="M12 9.14001C10.43 9.14001 9.15002 10.42 9.15002 12C9.15002 13.57 10.43 14.85 12 14.85C13.57 14.85 14.86 13.57 14.86 12C14.86 10.43 13.57 9.14001 12 9.14001Z"
        fill="black"
        fillOpacity="0.2"
      />
    </svg>
  );
}

export function CrossedEye(props: Props) {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.27 9.18005C20.98 8.72005 20.67 8.29005 20.35 7.89005C19.98 7.42005 19.28 7.38005 18.86 7.80005L15.86 10.8001C16.08 11.4601 16.12 12.2201 15.92 13.0101C15.57 14.4201 14.43 15.5601 13.02 15.9101C12.23 16.1101 11.47 16.0701 10.81 15.8501C10.81 15.8501 9.38001 17.2801 8.35001 18.3101C7.85001 18.8101 8.01001 19.6901 8.68001 19.9501C9.75001 20.3601 10.86 20.5701 12 20.5701C13.78 20.5701 15.51 20.0501 17.09 19.0801C18.7 18.0801 20.15 16.6101 21.32 14.74C22.27 13.2301 22.22 10.6901 21.27 9.18005Z"
        fill="black"
        fillOpacity="0.2"
      />
      <path
        d="M14.02 9.98001L9.98001 14.02C9.47001 13.5 9.14001 12.78 9.14001 12C9.14001 10.43 10.42 9.14001 12 9.14001C12.78 9.14001 13.5 9.47001 14.02 9.98001Z"
        fill="black"
        fillOpacity="0.2"
      />
      <path
        d="M18.25 5.75005L14.86 9.14005C14.13 8.40005 13.12 7.96005 12 7.96005C9.76 7.96005 7.96 9.77005 7.96 12.0001C7.96 13.1201 8.41 14.1301 9.14 14.8601L5.76 18.2501H5.75C4.64 17.3501 3.62 16.2001 2.75 14.8401C1.75 13.2701 1.75 10.7201 2.75 9.15005C3.91 7.33005 5.33 5.90005 6.91 4.92005C8.49 3.96005 10.22 3.43005 12 3.43005C14.23 3.43005 16.39 4.25005 18.25 5.75005Z"
        fill="black"
        fillOpacity="0.2"
      />
      <path
        d="M14.86 12C14.86 13.57 13.58 14.86 12 14.86C11.94 14.86 11.89 14.86 11.83 14.84L14.84 11.83C14.86 11.89 14.86 11.94 14.86 12Z"
        fill="black"
        fillOpacity="0.2"
      />
      <path
        d="M21.77 2.23C21.47 1.93 20.98 1.93 20.68 2.23L2.23 20.69C1.93 20.99 1.93 21.48 2.23 21.78C2.38 21.92 2.57 22 2.77 22C2.97 22 3.16 21.92 3.31 21.77L21.77 3.31C22.08 3.01 22.08 2.53 21.77 2.23Z"
        fill="black"
        fillOpacity="0.2"
      />
    </svg>
  );
}