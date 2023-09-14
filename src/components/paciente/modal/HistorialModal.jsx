import { useEffect, useState } from "react";
import styles from "./HistorialModal.module.css";
import TurnoModal from "./TurnoModal";
import toast from "react-hot-toast";

export default function HistorialModal({ close, id }) {
  const [turnos, setTurnos] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/turnos/?pacienteId=" + id
      );
      const json = await res.json();
      if (res.ok) {
        setTurnos(json);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <div onClick={() => close()} className={styles.background}></div>
      <div className={styles.modal}>
        <span onClick={() => close()} className={styles.iconClose}>
          Cerrar
        </span>
        <div className={styles.header}>
          <span>Paciente</span>
          <span>Doctor/a</span>
          <span>Fecha</span>
          <span>Hora</span>
          <span>Consultorio</span>
        </div>
        <div className={styles.list}>
          {turnos.length > 0 ? (
            turnos.map((turno) => <TurnoModal key={turno.id} turno={turno} />)
          ) : (
            <h2>No tiene turnos registrados</h2>
          )}
        </div>
      </div>
    </div>
  );
}
