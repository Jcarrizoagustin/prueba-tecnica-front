import { useEffect, useState } from "react";
import BarraBusqueda from "../busqueda/BarraBusqueda";
import Paciente from "./Paciente";
import styles from "./PacienteContainer.module.css";
import HistorialModal from "./modal/HistorialModal";
import toast from "react-hot-toast";
import NuevoTurno from "../turno/nuevoturno/NuevoTurno";
export default function PacienteContainer() {
  const [showModal, setShowModal] = useState(false);
  const [showNuevoTurno, setShowNuevoTurno] = useState(false);

  const [pacientesApi, setPacientesApi] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  const [pacienteId, setPacienteId] = useState(null);

  const mostrarModal = (id) => {
    setShowModal(true);
    setPacienteId(id);
  };

  const mostrarNuevoTurno = (id) => {
    setShowNuevoTurno(true);
    setPacienteId(id);
  };

  const ocultarModal = () => setShowModal(false);

  const ocultarNuevoTurno = () => setShowNuevoTurno(false);

  const getPacientes = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/pacientes");

      const data = await res.json();

      if (res.ok) {
        setPacientesApi(data);
        setPacientes(data);
      } else {
        toast.error("Ocurrio un error");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtrarPorPaciente = (nombre) => {
    const filtro = pacientesApi.filter(
      (n) =>
        n.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
        n.apellido.toLowerCase().includes(nombre.toLowerCase())
    );
    setPacientes(filtro);
  };

  useEffect(() => {
    getPacientes();
  }, []);

  return (
    <>
      <div className={styles.containerRadius}>
        <div className={styles.container}>
          <div className={styles.back}>
            <BarraBusqueda handleChange={(e) => filtrarPorPaciente(e)} />
          </div>
          <div className={styles.header}>
            <span>Nombre</span>
            <span>Dni</span>
            <span>Nacimiento</span>
            <span>Telefono</span>
            <span>Acciones</span>
          </div>
          <div className={styles.list}>
            {pacientes.map((e) => (
              <Paciente
                key={e.id}
                paciente={e}
                handleClickHistorial={() => mostrarModal(e.id)}
                handleNuevoTurno={() => mostrarNuevoTurno(e.id)}
              />
            ))}
          </div>
        </div>
      </div>
      {showModal && <HistorialModal close={ocultarModal} id={pacienteId} />}
      {showNuevoTurno && (
        <NuevoTurno close={ocultarNuevoTurno} id={pacienteId} />
      )}
    </>
  );
}
