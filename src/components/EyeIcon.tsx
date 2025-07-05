const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M17.94 17.94A10.94 10.94 0 0112 20C5 20 1 12 1 12a21.81 21.81 0 014.19-5.94" />
    <path d="M22.54 12.88A21.81 21.81 0 0012 4c-1.61 0-3.16.38-4.56 1.06" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default { EyeIcon, EyeOffIcon };
