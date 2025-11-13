import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard"; // 👈 importa o componente

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota principal para o Dashboard */}
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
