import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Clients from "./pages/Clients";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/clientes" element={<Clients />} />
      </Routes>
    </Router>
  );
}