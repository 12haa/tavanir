import { colors } from '../lib/theme';

function NavMenuButton() {
  return (
    <button
      type="button"
      className="fixed top-3/5 right-1 z-50 -translate-y-1/2 cursor-pointer rounded-l-md py-2 px-3 text-md font-iran text-black shadow-lg transition-colors [writing-mode:vertical-rl]"
      style={{ backgroundColor: colors.navMenu[100] }}
    >
      منو سامانه
    </button>
  );
}

export default NavMenuButton;
