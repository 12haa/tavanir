import type { InputHTMLAttributes } from 'react';

interface LoginTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function LoginTextInput({ label, className = '', ...rest }: LoginTextInputProps) {
  return (
    <div className={`flex flex-col gap-1 w-full${className}`} dir="rtl">
      {label && <label className="text-xs font-medium text-gray-600">{label}</label>}
      <input
        {...rest}
        className="w-full border-b-2 border-[var(--color-primary-border)] py-2 text-sm outline-none transition-colors placeholder:text-[var(--color-placeholder-text)]"
      />
    </div>
  );
}

export default LoginTextInput;
