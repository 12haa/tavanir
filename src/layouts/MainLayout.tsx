import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div dir="rtl" className="flex min-h-screen flex-col">
      <header className="w-full border-b border-[var(--color-primary-border)] bg-white py-4 shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          <span className="text-lg font-bold font-iran text-gray-800">توانیر</span>
        </div>
      </header>
      <main className="flex w-full flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
