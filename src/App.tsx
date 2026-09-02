import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ActivityReport from "./pages/ActivityReport";
import MainLayout from "./layouts/MainLayout";
import type { JSX } from "react/jsx-runtime";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/activity-report" element={<ActivityReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
