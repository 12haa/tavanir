import { Navigate } from "react-router-dom";
import type { LoginCredentials } from "../types";

function Login() {
  // const isAuthenticated = !!localStorage.getItem("token");

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  const handleLogin = (_credentials: LoginCredentials) => {
    // TODO: implement authentication logic
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold text-blue-600">Login</h1>
    </main>
  );
}

export default Login;