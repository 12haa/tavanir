import { type ReactNode } from 'react';
import avatarImg from '../../../assets/images/tavanir.png'

function LoginModal({ children }: { children?: ReactNode }) {
  return (
    <div className="relative w-[400px] h-[587px] rounded-2xl bg-white/40 shadow-xl backdrop-blur-md px-3">
      <div className="absolute left-[87px] -translate-x-1/2 top-[-40px] h-[80px] w-[85px] rounded-full overflow-hidden">
        <img src={avatarImg} alt="Avatar" className="h-full w-full object-cover" />
      </div>
      <div className="pt-[45px] flex flex-col items-center justify-center h-full">{children}</div>
    </div>
  );
}

export default LoginModal;
