import loginBg from '../assets/images/login.jpg';
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
        className="absolute inset-0 bg-cover bg-[center_2%]  "
        style={{ backgroundImage: `url(${loginBg})` }}
      />
      {/* Gray overlay */}
      <div className="absolute inset-0 bg-white/35" />

      {/* Content */}
      <div className="relative z-10 mb-13">
        <LoginModal>
          <h1 className="text-2xl font-bold text-blue-600">Login</h1>
        </LoginModal>
      </div>
    </main>
  );
}

export default Login;
