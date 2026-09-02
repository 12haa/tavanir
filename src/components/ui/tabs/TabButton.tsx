import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { colors } from '../../../lib/theme';
import Text from '../../shared/Text';

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  selected?: boolean;
}

function TabButton({ children, className = '', selected = false, ...rest }: TabButtonProps) {
  return (
    <button
      className={twMerge(
        'px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer',
        className,
      )}
      style={{
        backgroundColor: selected ? colors.navPanel[200] : 'transparent',
        borderWidth: selected ? 1 : 0,
        borderColor: selected ? colors.navPanel[200] : 'transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.navPanel[200];
        e.currentTarget.style.borderWidth = '1px';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = selected ? colors.navPanel[200] : 'transparent';
        e.currentTarget.style.borderWidth = selected ? '1px' : '0px';
      }}
      {...rest}
    >
      <Text
        className="text-md font-medium font-iran"
        as="span"
        style={{ color: colors.primaryTextColor[100] }}
      >
        {children}
      </Text>
    </button>
  );
}

export default TabButton;
