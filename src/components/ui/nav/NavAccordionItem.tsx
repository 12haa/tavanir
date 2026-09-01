import { useEffect, useRef } from 'react';
import { colors } from '../../../lib/theme';
import { type NavMenuItem } from '../../../constants/nav';
import ArrowRight from '../../../assets/icons/ArrowRight';
import Dot from '../../../assets/icons/dot';
import Text from '../../shared/Text';

interface NavAccordionItemProps {
  item: NavMenuItem;
  isOpen: boolean;
  onToggle: () => void;
}

function NavAccordionItem({ item, isOpen, onToggle }: NavAccordionItemProps) {
  const hasChildren = !!item.children?.length;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // scroll the opened accordion into view inside the panel's scroll container
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isOpen]);

  return (
    <div ref={ref} className="flex flex-col">
      <button
        type="button"
        onClick={() => hasChildren && onToggle()}
        className="flex w-full items-center justify-start py-2 text-right gap-2 cursor-pointer"
      >
        {hasChildren && (
          <ArrowRight
            width={13}
            height={13}
            color={colors.primaryTextColor[100]}
            style={{
              transition: 'transform 0.3s ease-in-out',
              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          />
        )}
        <Text
          as="span"
          className="text-md font-iran font-semibold"
          style={{ color: colors.primaryTextColor[100] }}
        >
          {item.menuTitle}
        </Text>
      </button>

      {hasChildren && (
        <div
          className="mr-2 grid transition-[grid-template-rows] duration-300 ease-in-out"
          style={{
            gridTemplateRows: isOpen ? '1fr' : '0fr',
          }}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col pr-1">
              {item.children!.map((child) => (
                <button
                  key={child.id}
                  type="button"
                  className="flex items-start gap-3 py-1.5 text-right cursor-pointer"
                >
                  <Dot
                    width={28}
                    height={28}
                    color={colors.primaryTextColor[100]}
                    className="shrink-0 flex-none mt-0.5"
                  />
                  <Text
                    as="span"
                    className="text-md font-iran flex-1 min-w-0 text-right leading-6"
                    style={{ color: colors.primaryTextColor[100] }}
                  >
                    {child.menuTitle}
                  </Text>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavAccordionItem;
