// src/App.tsx
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Purchases from "./pages/Purchases";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/purchases" element={<Purchases />} />
        <Route path="*" element={<Navigate to="/purchases" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
