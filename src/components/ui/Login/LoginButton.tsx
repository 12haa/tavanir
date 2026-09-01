import type { ButtonHTMLAttributes } from 'react';
import { colors } from '../../../lib/theme';

interface LoginButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

function LoginButton({ label, className = '', ...rest }: LoginButtonProps) {
  return (
    <button
      {...rest}
      className={`w-full py-4.5 rounded-md cursor-pointer text-lg font-bold font-iran text-white outline-none transition-colors ${className}`}
      style={{ backgroundColor: colors.primaryBtn[100] }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.secondaryBtn[100])}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.primaryBtn[100])}
    >
      {label}
    </button>
  );
}

export default LoginButton;
