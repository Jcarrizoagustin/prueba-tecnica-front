import { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/menu/Menu";
import Main from "./components/main/Main";
import { Route, Routes } from "react-router-dom";

import InicioPage from "./pages/InicioPage";
import DoctoresPage from "./pages/DoctoresPage";
import EspecialidadesPage from "./pages/EspecialidadesPage";
import PacientesPage from "./pages/PacientesPage";
import TurnosPage from "./pages/TurnosPage";

function App() {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/patients");
      const json = await res.json();
      setUser(json);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Menu />
      <Main>
        <Routes>
          <Route path="/inicio" element={<InicioPage />} />
          <Route path="/doctores" element={<DoctoresPage />} />
          <Route path="/especialidades" element={<EspecialidadesPage />} />
          <Route path="/pacientes" element={<PacientesPage />} />
          <Route path="/turnos" element={<TurnosPage />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
