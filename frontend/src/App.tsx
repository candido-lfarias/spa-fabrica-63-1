import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Vendedores from "./pages/Vendedores";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/vendedores" element={<Vendedores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;