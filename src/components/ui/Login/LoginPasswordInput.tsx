import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';

interface LoginPasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

function LoginPasswordInput({ label, className = '', ...rest }: LoginPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`} dir="rtl">
      {label && <label className="text-xs font-medium text-gray-600">{label}</label>}
      <div className="relative">
        <input
          {...rest}
          type={showPassword ? 'text' : 'password'}
          className="w-full border-b-2 border-[var(--color-primary-border)] py-2 text-sm outline-none transition-colors placeholder:text-[var(--color-placeholder-text)]"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
        >
          {showPassword ? 'پنهان' : 'نمایش'}
        </button>
      </div>
    </div>
  );
}

export default LoginPasswordInput;
