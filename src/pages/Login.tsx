import loginBg from '../assets/images/login.jpg';
import { colors } from '../lib/theme';
import type { LoginCredentials } from '../types';
import LoginModal from '../components/LoginModal';
import LoginTextInput from '../components/ui/Login/LoginTextInput';
import LoginPasswordInput from '../components/ui/Login/LoginPasswordInput';

function Login() {
  const handleLogin = (_credentials: LoginCredentials) => {
    // TODO: implement authentication logic
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden ">
      <div
        className="absolute inset-0 bg-cover bg-[center_2%]"
        style={{ backgroundImage: `url(${loginBg})` }}
      />
      <div className="absolute inset-0 bg-white/35" />

      <div className="relative z-10 mb-11.5">
        <LoginModal>
          <div className="flex flex-col items-center justify-start gap-20 w-full h-full">
            <div className="flex flex-col items-center w-full pt-1 gap-0.5">
              <h1
                className="text-[#ea580c] text-[29px] font-bold font-iran"
                style={{ color: colors.primary[600] }}
              >
                سامانه مدیریت پیک بار کشور
              </h1>
              <h3 className="font-iran" style={{ color: colors.primarySubText[100] }}>
                توانیر
              </h3>
            </div>

            <div className="flex flex-col items-center w-full px-6 gap-4">
              <LoginTextInput
                label="ایمیل"
                type="email"
                placeholder="ایمیل خود را وارد کنید"
              />
              <LoginPasswordInput
                label="رمز عبور"
                placeholder="رمز عبور خود را وارد کنید"
              />
              <button
                type="button"
                onClick={handleLogin}
                className="w-full rounded-lg bg-[#ea580c] py-2.5 text-white text-sm font-bold transition-colors hover:bg-orange-700"
              >
                ورود
              </button>
            </div>
          </div>
        </LoginModal>
      </div>
    </main>
  );
}

export default Login;