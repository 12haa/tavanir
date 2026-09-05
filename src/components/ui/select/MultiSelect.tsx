import { useEffect, useMemo, useRef, useState } from 'react';
import './select.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  className?: string;
  name?: string;
  disabled?: boolean;
  /** show search input inside dropdown – default true */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** when false behaves as single-select but still with checkbox UI – default true */
  multiple?: boolean;
}

export default function MultiSelect({
  label,
  placeholder = 'انتخاب کنید',
  options,
  value,
  defaultValue,
  onChange,
  className = '',
  name,
  disabled = false,
  searchable = true,
  searchPlaceholder = 'جستجو...',
  multiple = true,
}: MultiSelectProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string[]>(defaultValue ?? []);
  const selectedValues = isControlled ? (value ?? []) : internal;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // reset search when closed
  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const filtered = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter(
      (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q),
    );
  }, [options, query, searchable]);

  const toggle = (val: string, isDisabled?: boolean) => {
    if (isDisabled || disabled) return;
    let next: string[];
    const isSelected = selectedValues.includes(val);
    if (multiple) {
      next = isSelected ? selectedValues.filter((v) => v !== val) : [...selectedValues, val];
    } else {
      next = isSelected ? [] : [val];
      // single mode: close after pick
      setOpen(false);
    }
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const selectedLabels = options
    .filter((o) => selectedValues.includes(o.value))
    .map((o) => o.label);

  let display: string;
  if (selectedLabels.length === 0) display = '';
  else if (!multiple) display = selectedLabels[0];
  else if (selectedLabels.length <= 2) display = selectedLabels.join('، ');
  else display = `${selectedLabels.slice(0, 2).join('، ')} +${selectedLabels.length - 2}`;

  return (
    <div ref={wrapRef} className={`cselect-wrap ${className}`}>
      {label && <label className="cselect-label font-iran">{label}</label>}
      {name && selectedValues.map((v) => <input key={v} type="hidden" name={name} value={v} />)}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={`cselect-trigger ${open ? 'cselect-open' : ''} ${disabled ? 'cselect-disabled' : ''} w-full`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className={`cselect-value ${selectedValues.length === 0 ? 'cselect-placeholder' : ''}`}
        >
          {selectedValues.length === 0 ? placeholder : display}
        </span>
        {/* badge count when many */}
        {multiple && selectedValues.length > 2 && (
          <span className="cselect-tag">{selectedValues.length}</span>
        )}
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
        <div className="cselect-panel" role="listbox" aria-multiselectable={multiple}>
          {searchable && (
            <div className="cselect-search-wrap">
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="cselect-search"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div className="cselect-options">
            {filtered.length === 0 ? (
              <div className="cselect-empty">موردی یافت نشد</div>
            ) : (
              filtered.map((opt) => {
                const isSelected = selectedValues.includes(opt.value);
                return (
                  <label
                    key={opt.value}
                    className={`cselect-option ${isSelected ? 'cselect-selected' : ''} ${opt.disabled ? 'cselect-disabled' : ''}`}
                    onClick={(e) => {
                      // prevent label double toggle
                      e.preventDefault();
                      toggle(opt.value, opt.disabled);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggle(opt.value, opt.disabled)}
                      disabled={opt.disabled}
                      className="cselect-checkbox"
                      // when multiple=false use radio semantics visually but keep checkbox
                      // checkbox is required per spec
                    />
                    <span style={{ flex: 1 }}>{opt.label}</span>
                  </label>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
