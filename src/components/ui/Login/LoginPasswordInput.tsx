import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import PasswordEyeSvg from '../../../assets/icons/PasswordEyeSvg';

interface LoginPasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

function LoginPasswordInput({ label, className = '', ...rest }: LoginPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDown = () => setShowPassword(true);
  const handleMouseUp = () => setShowPassword(false);
  const handleMouseLeave = () => setShowPassword(false);
  const handleTouchStart = () => setShowPassword(true);
  const handleTouchEnd = () => setShowPassword(false);

  return (
    <div className={`flex flex-col gap-3 w-full ${className}`} dir="rtl">
      {label && <label className="text-sm font-bold text-gray-700">{label}</label>}
      <div className="relative">
        <input
          {...rest}
          type={showPassword ? 'text' : 'password'}
          className="w-full border-b-2 border-[var(--color-primary-border)] py-3.5 pr-5 text-sm font-iran outline-none transition-colors placeholder:text-base placeholder:text-[var(--color-placeholder-text)]"
        />
        <button
          type="button"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <PasswordEyeSvg width={24} height={24} />
        </button>
      </div>
    </div>
  );
}

export default LoginPasswordInput;
