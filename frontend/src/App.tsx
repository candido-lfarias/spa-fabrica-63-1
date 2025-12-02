import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Suppliers from "./pages/Suppliers"; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/fornecedores" element={<Suppliers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;