import { Outlet } from 'react-router-dom';
import { colors } from '../lib/theme';
import tavanirLogo from '../assets/images/tavanir.png';
import Image from '../components/shared/Image';

function MainLayout() {
  const userName = 'کاربر';

  return (
    <div
      dir="rtl"
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: colors.background[100] }}
    >
      <header
        className="fixed inset-x-0 top-0 z-50 w-full py-3 "
        style={{ backgroundColor: colors.background[100] }}
      >
        <div className="mx-auto flex w-full  items-center justify-between px-10 ">
          <div className="flex items-center gap-2">
            <Image
              src={tavanirLogo}
              alt="توانیر"
              className="object-contain"
              width={64}
              height={64}
            />
            <span
              className="text-2xl font-bold font-iran mb-1 "
              style={{ color: colors.primaryTextColor[100] }}
            >
              توانیر
            </span>
          </div>
          <span className="font-iran text-sm text-gray-700">{userName}</span>
        </div>
      </header>
      <main className="flex w-full flex-1 flex-col pt-36 px-20">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
