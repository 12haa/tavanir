import { useState } from "react";
import type { InputHTMLAttributes } from "react";

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

function PasswordInput({ label, error, className = "", ...rest }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex flex-col gap-1 ${className}`} dir="rtl">
      {label && (
        <label className="text-xs font-medium text-gray-600">{label}</label>
      )}
      <div className="relative">
        <input
          {...rest}
          type={showPassword ? "text" : "password"}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-[#ea580c] focus:ring-2 focus:ring-orange-100"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
        >
          {showPassword ? "پنهان" : "نمایش"}
        </button>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export default PasswordInput;