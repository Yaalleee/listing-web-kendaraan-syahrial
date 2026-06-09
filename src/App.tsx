import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import CarDetail from "./pages/CarDetail.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/car/:id" element={<CarDetail />} />
    </Routes>
  );
}