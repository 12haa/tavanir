import loginBg from '../assets/images/login.jpg';
import { colors } from '../lib/theme';
import type { LoginCredentials } from '../types';
import LoginModal from '../components/LoginModal';

function Login() {
  const handleLogin = (_credentials: LoginCredentials) => {
    // TODO: implement authentication logic
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden ">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-[center_2%]"
        style={{ backgroundImage: `url(${loginBg})` }}
      />
      {/* Gray overlay */}
      <div className="absolute inset-0 bg-white/35" />

      {/* Content */}
      <div className="relative z-10 mb-11">
        <LoginModal>
          <div className="flex flex-col items-center justify-start gap-20 w-full h-full">
            <div className=" flex flex-col items-center  w-full p-1">
              <h1
                className="text-[#ea580c] text-[25px] font-bold"
                style={{ color: colors.primary[600] }}
              >
                سامانه مدیریت پیک بار کشور
              </h1>
              <h3>توانیر</h3>
            </div>
            <div className=" flex flex-col items-center w-full p-1">s</div>
            <div className=" flex flex-col items-center w-full p-1">d</div>
          </div>
        </LoginModal>
      </div>
    </main>
  );
}

export default Login;
