import { useState } from 'react';
import { colors } from '../../../lib/theme';
import { type NavMenuItem } from '../../../constants/nav';
import ArrowRight from '../../../assets/icons/ArrowRight';
import Dot from '../../../assets/icons/dot';

interface NavAccordionItemProps {
  item: NavMenuItem;
}

function NavAccordionItem({ item }: NavAccordionItemProps) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!item.children?.length;

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => hasChildren && setOpen((prev) => !prev)}
        className="flex w-full items-center justify-start py-2 text-right gap-1"
      >
        {hasChildren && (
          <ArrowRight
            width={14}
            height={14}
            color={colors.navPanel[200]}
            className=""
            style={{
              transition: 'transform 0.3s ease-in-out',
              transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          />
        )}
        <span className="text-sm font-iran font-medium text-gray-800">{item.menuTitle}</span>
      </button>

      {hasChildren && (
        <div
          className="mr-2 overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{
            maxHeight: open ? 300 : 0,
          }}
        >
          <div className="flex flex-col pr-1">
            {item.children!.map((child) => (
              <button
                key={child.id}
                type="button"
                className="flex items-center gap-5 py-1.5 text-right"
              >
                <Dot width={18} height={18} color={colors.navPanel[200]} />
                <span className="text-sm font-iran text-gray-600">{child.menuTitle}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavAccordionItem;
