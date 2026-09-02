import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { colors } from '../../lib/theme';

type TextProps<C extends ElementType = 'p'> = {
  as?: C;
  children?: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<C>;

const DEFAULT_CLASSES = `font-iran `;

function Text<C extends ElementType = 'p'>({
  as,
  className = '',
  children,
  style,
  ...rest
}: TextProps<C>) {
  const Component = as || 'p';
  return (
    <Component
      className={twMerge(DEFAULT_CLASSES, className)}
      {...rest}
      style={{ color: colors.primaryTextColor[100], ...style }}
    >
      {children}
    </Component>
  );
}

export default Text;
