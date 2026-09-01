import { colors } from '../lib/theme';

interface NavMenuPanelProps {
  open: boolean;
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
    ></div>
  );
}

export default NavMenuPanel;
