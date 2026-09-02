import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { colors } from '../../lib/theme';
import Message from '../../assets/icons/Message';

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
  /** Boolean to show the message icon */
  showMessage?: boolean;
  /** Click handler for the message button */
  onMessageClick?: () => void;
  /** Href for the message button */
  messageHref?: string;
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
  showMessage = true,
  onMessageClick,
  messageHref,
  ...rest
}: CustomWrapperProps) {
  const fixedClasses = fixed ? `` : '';

  return (
    <div
      className={` relative rounded-2xl shadow-md flex flex-col gap-2 px-5 overflow-hidden ${fixedClasses} ${className}`}
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
      {showMessage ? (
        <button
          onClick={onMessageClick}
          className="absolute top-1 -rotate-90 left-3 z-10 p-1 rounded hover:bg-gray-100 py-2"
        >
          {messageHref ? (
            <a href={messageHref}>
              <Message />
            </a>
          ) : (
            <Message />
          )}
        </button>
      ) : null}
      {children}
    </div>
  );
}

export default CustomWrapper;
