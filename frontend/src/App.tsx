// src/App.tsx
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Purchases from "./pages/Purchases";
import Buyers from "./pages/Buyers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/buyers" element={<Buyers />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="*" element={<Navigate to="/purchases" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
