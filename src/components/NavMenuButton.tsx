import { useState } from 'react';
import { colors } from '../lib/theme';
import NavMenuPanel from './NavMenuPanel';

function NavMenuButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed top-3/5 right-1 z-50 -translate-y-1/2 cursor-pointer rounded-l-sm py-1 px-3 text-md font-iran text-black shadow-lg transition-colors [writing-mode:vertical-rl]"
        style={{ backgroundColor: colors.navMenu[100] }}
      >
        منو سامانه
      </button>

      <NavMenuPanel open={open} />
    </>
  );
}

export default NavMenuButton;
