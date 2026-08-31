import { type ReactNode } from 'react';

function LoginModal({ children }: { children?: ReactNode }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-1/2 -translate-x-1/2 top-[-60px] h-[120px] w-[120px] rounded-full bg-blue-400" />
      <div className="relative w-[500px] h-[650px] overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="pt-[80px] flex flex-col items-center justify-center h-full">{children}</div>
      </div>
    </div>
  );
}

export default LoginModal;
