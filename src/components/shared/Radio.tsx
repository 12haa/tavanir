import type { ChangeEvent } from 'react';

interface RadioProps {
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
}

function Radio({
  label,
  checked,
  onChange,
  value,
  name,
  disabled = false,
  className = '',
  labelClassName = '',
}: RadioProps) {
  return (
    <label
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 accent-[#248657] cursor-pointer disabled:cursor-not-allowed focus:outline-none"
      />
      <span className={`text-sm text-gray-700 ${labelClassName}`}>{label}</span>
    </label>
  );
}

export default Radio;
