import "./App.css";
import Menu from "./components/menu/Menu";
import Main from "./components/main/Main";
import { Route, Routes } from "react-router-dom";
import DoctoresPage from "./pages/DoctoresPage";
import PacientesPage from "./pages/PacientesPage";
import TurnosPage from "./pages/turnos/TurnosPage";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Menu />
      <Main>
        <Routes>
          <Route path="/doctores" element={<DoctoresPage />} />
          <Route path="/pacientes" element={<PacientesPage />} />
          <Route path="/turnos" element={<TurnosPage />} />
        </Routes>
      </Main>
      <Toaster />
    </>
  );
}

export default App;
