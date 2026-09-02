import { colors } from '../../lib/theme';

interface DividerProps {
  className?: string;
}

function Divider({ className = '' }: DividerProps) {
  return (
    <div
      className={`w-full ${className}`}
      style={{ borderTop: `1px solid ${colors.divider[100]}` }}
    />
  );
}

export default Divider;
