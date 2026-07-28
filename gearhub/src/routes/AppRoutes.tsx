import { Routes, Route } from "react-router-dom";
import Test from "../pages/Test";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
    </Routes>
  );
}