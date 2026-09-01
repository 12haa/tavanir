import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { colors } from '../../lib/theme';

interface CustomWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Extra tailwind classes — use for width/padding overrides e.g. "w-[400px] p-6" */
  className?: string;
  /** Inline style overrides (merged after defaults) */
  style?: CSSProperties;
  /** Direct width prop (number = px) — alternative to className */
  width?: number | string;
  /** Direct height prop */
  height?: number | string;
  /** Direct maxHeight prop */
  maxHeight?: number | string;
  /** Background — defaults to #fefeff as requested */
  bgColor?: string;
  /** If true, applies same fixed positioning as NavMenuPanel (fixed top-17 z-99) */
  fixed?: boolean;
  /** When fixed=true, controls slide in/out like NavMenuPanel's `open` */
  open?: boolean;
}

/**
 * CustomWrapper — same visual pattern as NavMenuPanel
 * - rounded-2xl + shadow-md + 1px solid navPanel[200]
 * - bg #fefeff (vs NavMenuPanel's #fffbf6)
 * - flexible via width/height/maxHeight props + className + style
 *
 * Usage:
 * <CustomWrapper width={400} className="p-6 gap-4">...</CustomWrapper>
 * <CustomWrapper className="w-[500px] px-8 py-6">...</CustomWrapper>
 * <CustomWrapper style={{ width: 350, padding: 24 }}>...</CustomWrapper>
 */
function CustomWrapper({
  children,
  className = '',
  style,
  width = 300,
  height,
  maxHeight,
  bgColor = '#fefeff',
  fixed = false,
  open,
  ...rest
}: CustomWrapperProps) {
  const fixedClasses = fixed
    ? ``
    : '';

  return (
    <div
      className={`rounded-2xl shadow-md flex flex-col gap-2 px-5 overflow-hidden ${fixedClasses} ${className}`}
      style={{
        width,
        height,
        maxHeight,
        backgroundColor: bgColor,
        border: `1px solid ${colors.navPanel[200]}`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export default CustomWrapper;
