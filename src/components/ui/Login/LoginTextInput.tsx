import type { InputHTMLAttributes } from 'react';

interface LoginTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function LoginTextInput({ label, className = '', ...rest }: LoginTextInputProps) {
  return (
    <div className={`flex flex-col gap-3 w-full${className}`} dir="rtl">
      {label && <label className="text-md font-normal text-gray-700 font-iran">{label}</label>}
      <input
        {...rest}
        className="w-full border-b-2 border-[var(--color-primary-border)] py-3.5 text-sm font-iran outline-none transition-colors placeholder:text-base placeholder:pr-5 placeholder:text-[var(--color-placeholder-text)]"
      />
    </div>
  );
}

export default LoginTextInput;
