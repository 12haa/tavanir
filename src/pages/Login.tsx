import { useNavigate } from 'react-router-dom';
import loginBg from '../assets/images/login.jpg';
import { colors } from '../lib/theme';
import LoginModal from '../components/ui/Login/LoginModal';
import LoginTextInput from '../components/ui/Login/LoginTextInput';
import LoginPasswordInput from '../components/ui/Login/LoginPasswordInput';
import LoginButton from '../components/ui/Login/LoginButton';
import Text from '../components/shared/Text';


function Login() {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden ">
      <div
        className="absolute inset-0 bg-cover bg-[center_2%]"
        style={{ backgroundImage: `url(${loginBg})` }}
      />
      <div className="absolute inset-0 bg-white/35" />

      <div className="relative z-10 mb-11.5">
        <LoginModal>
          <div className="flex flex-col items-center justify-start gap-10 w-full h-full">
            <div className="flex flex-col items-center w-full pt-1 gap-0.5">
              <Text
                as="h1"
                className="text-[#ea580c] text-[29px] font-bold font-iran"
                style={{ color: colors.primary[600] }}
              >
                سامانه مدیریت پیک بار کشور
              </Text>
              <Text as="h3" className="font-iran" style={{ color: colors.primarySubText[100] }}>
                توانیر
              </Text>
            </div>

            <div className="flex flex-col items-start w-full px-6 gap-8">
              <LoginTextInput
                label="نام کاربری"
                type="email"
                placeholder="نام کاربری خود را وارد کنید"
              />
              <LoginPasswordInput label="كلمه عبور" placeholder="رمز عبور خود را وارد کنید" />
              <div className="mt-5 flex w-full h-full">
                <LoginButton label="ورود به سامانه" onClick={() => navigate('/')} />
              </div>
              <div className="flex flex-col gap-2  items-center justify-center">
                <Text
                  as="h2"
                  className="text-sm font-iran"
                  style={{ color: colors.primarySubText[200] }}
                >
                  v9.36.86.219
                </Text>
                <Text
                  as="p"
                  className="text-sm font-iran"
                  style={{ color: colors.primarySubText[200] }}
                >
                  تهیه شده توسط شرکت پارسیا افزار فرا اندیشان نوین ©
                </Text>
              </div>
            </div>
          </div>
        </LoginModal>
      </div>
    </main>
  );
}

export default Login;
