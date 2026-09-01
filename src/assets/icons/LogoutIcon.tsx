function LogoutIcon({ width = 24, height = 24, color = '#dc3545' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 1024 1024"
      fill="none"
    >
      <path
        d="M602 215.1c144.09 39.44 250 171.33 250 327.95 0 187.78-152.23 340-340 340-187.78 0-340-152.22-340-340 0-156.62 105.9-288.51 250-327.95M512 140.95v408.12"
        fill="none"
        stroke={color}
        strokeMiterlimit="10"
        strokeWidth="45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default LogoutIcon;
