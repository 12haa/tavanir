import type { ChangeEvent } from 'react';
import { colors } from '../../lib/theme';
import Text from './Text';

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
        onMouseEnter={(e) => (e.currentTarget.style.accentColor = colors.radio.hover)}
        onMouseLeave={(e) => (e.currentTarget.style.accentColor = colors.radio[100])}
        className="w-4 h-4 cursor-pointer disabled:cursor-not-allowed focus:outline-none"
        style={{ accentColor: colors.radio[100] }}
      />
      <Text className={`text-md  w-132.5 ${labelClassName}`}>{label}</Text>
    </label>
  );
}

export default Radio;
