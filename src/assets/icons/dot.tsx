function Dot({
  width = 24,
  height = 24,
  color = '#000000',
  className,
}: {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ flexShrink: 0, display: 'block' }}
    >
      <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6" fill={color} />
    </svg>
  );
}

export default Dot;
