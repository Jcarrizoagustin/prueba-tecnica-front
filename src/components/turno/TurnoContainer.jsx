import styles from "./TurnoContainer.module.css";
import Turno from "./Turno";
import { useEffect, useState } from "react";
import ModificarTurno from "./modificarTurno/ModificarTurno";

export default function TurnoContainer() {
  const [turnos, setTurnos] = useState([]);
  const [turnosApi, setTurnosApi] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [turnoAModificarId, setTurnoAModificarId] = useState(null);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = (e) => {
    console.log(e);
    setTurnoAModificarId(e);
    setShowModal(true);
  };

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/turnos");
      const json = await res.json();

      if (res.ok) {
        setTurnosApi(json);
        setTurnos(json);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filtrarPorPaciente = (nombre) => {
    const filtro = turnosApi.filter(
      (n) =>
        n.paciente.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
        n.paciente.apellido.toLowerCase().includes(nombre.toLowerCase())
    );
    setTurnos(filtro);
  };

  const filtrarPorDoctor = (nombre) => {
    const filtro = turnosApi.filter(
      (n) =>
        n.doctor.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
        n.doctor.apellido.toLowerCase().includes(nombre.toLowerCase())
    );
    setTurnos(filtro);
  };

  const filtrarPorFecha = (fecha) => {
    const filtro = turnosApi.filter((n) => n.dia === fecha);
    console.log(fecha);
    setTurnos(filtro);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.inputSearch}>
            <label htmlFor="paciente">Paciente</label>
            <input
              type="text"
              id="paciente"
              onChange={(e) => filtrarPorPaciente(e.target.value)}
            />
          </div>
          <div className={styles.inputSearch}>
            <label htmlFor="doctor">Doctor</label>
            <input
              type="text"
              id="paciente"
              onChange={(e) => filtrarPorDoctor(e.target.value)}
            />
          </div>
          <div className={styles.inputSearch}>
            <label htmlFor="fecha">Fecha</label>
            <input
              type="date"
              id="fecha"
              onChange={(e) => filtrarPorFecha(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.headerList}>
          <span className={styles.column}>Paciente</span>
          <span className={styles.column}>Doctor/a</span>
          <span className={styles.column}>Consultorio</span>
          <span className={styles.column}>Fecha</span>
          <span className={styles.column}>Hora</span>
          <span className={styles.column}>Acciones</span>
        </div>
        <div className={styles.list}>
          {turnos.length > 0 ? (
            turnos.map((turno) => (
              <Turno
                key={turno.id}
                turno={turno}
                data={getData}
                openModalModificar={openModal}
              />
            ))
          ) : (
            <h2>No hay resultados</h2>
          )}
        </div>
      </div>
      {showModal && (
        <ModificarTurno idTurno={turnoAModificarId} closeModal={closeModal} />
      )}
    </>
  );
}
