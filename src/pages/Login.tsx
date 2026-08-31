import { Navigate } from "react-router-dom";

function Login() {
  // ! TODO : implement authentication logic here
  // const isAuthenticated = !!localStorage.getItem("token");

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold text-blue-600">Login</h1>
    </main>
  );
}

export default Login;
