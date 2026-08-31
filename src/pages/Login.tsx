import type { LoginCredentials } from "../types";
import LoginModal from "../components/LoginModal";

function Login() {
  const handleLogin = (_credentials: LoginCredentials) => {
    // TODO: implement authentication logic
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <LoginModal>
        <h1 className="text-2xl font-bold text-blue-600">Login</h1>
      </LoginModal>
    </main>
  );
}

export default Login;