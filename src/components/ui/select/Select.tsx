import { useEffect, useRef, useState } from 'react';
import './select.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  name?: string;
  disabled?: boolean;
}

export default function Select({
  label,
  placeholder = 'انتخاب کنید',
  options,
  value,
  defaultValue,
  onChange,
  className = '',
  name,
  disabled = false,
}: SelectProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? '');
  const selectedValue = isControlled ? (value ?? '') : internal;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === selectedValue);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleSelect = (val: string, isDisabled?: boolean) => {
    if (isDisabled || disabled) return;
    if (!isControlled) setInternal(val);
    onChange?.(val);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className={`cselect-wrap ${className}`}>
      {label && <label className="cselect-label font-iran">{label}</label>}
      {/* hidden input for form compatibility */}
      {name && <input type="hidden" name={name} value={selectedValue} />}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={`cselect-trigger ${open ? 'cselect-open' : ''} ${disabled ? 'cselect-disabled' : ''} w-full`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`cselect-value ${!selectedOption ? 'cselect-placeholder' : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg className="cselect-caret" viewBox="0 0 20 20" fill="none">
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="cselect-panel" role="listbox">
          <div className="cselect-options">
            {options.length === 0 ? (
              <div className="cselect-empty">موردی یافت نشد</div>
            ) : (
              options.map((opt) => {
                const isSelected = opt.value === selectedValue;
                return (
                  <div
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value, opt.disabled)}
                    className={`cselect-option ${isSelected ? 'cselect-selected' : ''} ${opt.disabled ? 'cselect-disabled' : ''}`}
                  >
                    <span style={{ flex: 1 }}>{opt.label}</span>
                    {isSelected && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8L6.2 11.2L13 4.8"
                          stroke="#ff9e0c"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
