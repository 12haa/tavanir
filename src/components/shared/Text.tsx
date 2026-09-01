import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type TextProps<C extends ElementType = 'p'> = {
  as?: C;
  children?: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<C>;

function Text<C extends ElementType = 'p'>({ as, className = '', children, ...rest }: TextProps<C>) {
  const Component = as || 'p';
  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
}

export default Text;