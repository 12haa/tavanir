import { colors } from '../../../lib/theme';
import { navMenu, type NavMenuItem } from '../../../constants/nav';

interface NavMenuPanelProps {
  open: boolean;
}

function NavMenuItemRow({ item }: { item: NavMenuItem }) {
  return (
    <div key={item.id} className="flex flex-col">
      <span className="cursor-pointer py-2 text-sm font-iran font-medium text-gray-800">
        {item.menuTitle}
      </span>
      {item.children?.length ? (
        <div className="mr-3 flex flex-col border-r border-[#fc9e29] pr-3">
          {item.children.map((child) => (
            <span key={child.id} className="cursor-pointer py-1.5 text-sm font-iran text-gray-600">
              {child.menuTitle}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function NavMenuPanel({ open }: NavMenuPanelProps) {
  return (
    <div
      className={` fixed top-17 z-99 transition-transform duration-300 ease-in-out rounded-2xl shadow-md ${
        open ? 'right-8' : 'right-0'
      }`}
      style={{
        width: 300,
        height: 550,
        backgroundColor: colors.navPanel[100],
        border: `1px solid ${colors.navPanel[200]}`,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
      }}
    >
      <div className="flex flex-col p-5 overflow-y-auto">
        {navMenu.map((item) => (
          <NavMenuItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default NavMenuPanel;
