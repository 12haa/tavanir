import { colors } from '../../../lib/theme';
import { navMenu } from '../../../constants/nav';
import NavAccordionItem from './NavAccordionItem';
import Text from '../../shared/Text';
import Home from '../../../assets/icons/Home';
import { useState } from 'react';

interface NavMenuPanelProps {
  open: boolean;
}

function NavMenuPanel({ open }: NavMenuPanelProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div
      className={` fixed top-17 z-99 transition-transform duration-300 ease-in-out rounded-2xl shadow-md px-5 ${
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
      <div className=" flex gap-2 w-full items-center justify-start  pt-5">
        <Home height={18} width={18} />
        <Text as={'h2'} className="font-semibold" style={{ color: colors.primaryTextColor[100] }}>
          صفحه اصلی
        </Text>
      </div>
      <div className="flex flex-col py-4 overflow-y-auto">
        {navMenu.map((item) => (
          <NavAccordionItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
          />
        ))}
      </div>
    </div>
  );
}

export default NavMenuPanel;
