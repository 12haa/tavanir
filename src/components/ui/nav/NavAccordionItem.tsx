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

  return (
    <div className="flex flex-col">
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
          className="mr-2 overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{
            maxHeight: isOpen ? 300 : 0,
          }}
        >
          <div className="flex flex-col pr-1">
            {item.children!.map((child) => (
              <button
                key={child.id}
                type="button"
                className="flex items-center gap-5 py-1.5 text-right cursor-pointer"
              >
                <Dot width={28} height={28} color={colors.primaryTextColor[100]} />
                <Text
                  as="span"
                  className="text-md font-iran"
                  style={{ color: colors.primaryTextColor[100] }}
                >
                  {child.menuTitle}
                </Text>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavAccordionItem;
