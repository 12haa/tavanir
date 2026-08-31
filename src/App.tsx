import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import type { JSX } from "react/jsx-runtime";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
