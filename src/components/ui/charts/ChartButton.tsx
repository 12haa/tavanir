import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Text from '../../shared/Text';

interface ChartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  selected?: boolean;
}

function ChartButton({ children, className = '', selected = false, ...rest }: ChartButtonProps) {
  const bgColor = selected ? '#fdc942' : '#f8f9fa';
  const hoverColor = selected ? '#fdc030' : '#d3d4d5';
  const borderColor = selected ? '#' : '#D5D5D5';
  const textColor = '#00000';

  return (
    <button
      className={twMerge(
        'px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer border',
        className,
      )}
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = hoverColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = bgColor;
      }}
      {...rest}
    >
      <Text className="text-md font-medium font-iran" as="span" style={{ color: textColor }}>
        {children}
      </Text>
    </button>
  );
}

export default ChartButton;
