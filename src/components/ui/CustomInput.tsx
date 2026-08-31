import type { InputHTMLAttributes } from 'react';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

function CustomInput({ label, error, className = '', ...rest }: CustomInputProps) {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`} dir="rtl">
      {label && <label className="text-xs font-medium text-gray-600">{label}</label>}
      <input
        {...rest}
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-[#ea580c] focus:ring-2 focus:ring-orange-100"
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export default CustomInput;
