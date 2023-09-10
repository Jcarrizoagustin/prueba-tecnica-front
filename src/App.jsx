import { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/menu/Menu";
import Main from "./components/main/Main";
import DoctorContainer from "./components/doctor/DoctorContainer";
import PacienteContainer from "./components/paciente/PacienteContainer";

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
        <DoctorContainer />
        <PacienteContainer />
      </Main>
    </>
  );
}

export default App;
