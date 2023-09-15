import { useEffect, useState } from "react";
import styles from "./ModificarTurno.module.css";
import toast from "react-hot-toast";
export default function ModificarTurno({ closeModal, idTurno }) {
  const [turno, setTurno] = useState({
    id: 20,
    dia: "",
    hora: "",
    paciente: {
      id: 1,
      nombre: "Agustin",
      apellido: "Carrizo",
    },
    doctor: {
      id: 1,
      nombre: "",
      apellido: "",
    },
    consultorio: {
      id: "",
      descripcion: "",
    },
  });

  const actualizarEstado = (e) => {
    const { name, value } = e.target;
    if (name === "consultorio") {
      setTurno((prevState) => ({
        ...prevState,
        consultorio: {
          ...prevState,
          id: parseInt(value),
        },
      }));
    }
    if (name === "dia") {
      setTurno((prevState) => ({
        ...prevState,
        dia: value,
      }));
    }
    if (name === "hora") {
      console.log("hora " + value);
      setTurno((prevState) => ({
        ...prevState,
        hora: value,
      }));
    }
  };

  const getTurno = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/turnos/" + idTurno);

      const data = await res.json();

      if (res.ok) {
        setTurno(data);
        console.log(data);
      } else {
        toast.error("Ocurrio un error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const actualizarTurno = async () => {
    const payload = {
      doctor_id: turno.doctor.id,
      paciente_id: turno.paciente.id,
      consultorio_id: turno.consultorio.id,
      dia: turno.dia,
      hora: turno.hora,
    };

    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/turnos/" + idTurno,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("Turno actualizado con exito");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTurno();
  }, []);
  return (
    <div className={styles.container}>
      <div onClick={closeModal} className={styles.background}></div>
      <div className={styles.modificarTurno}>
        <span className={styles.row}>
          <span>Paciente:</span> {turno.paciente.nombre}{" "}
          {turno.paciente.apellido}
        </span>
        <span className={styles.row}>
          <span>Doctor/a:</span> {turno.doctor.nombre} {turno.doctor.apellido}
        </span>
        <span className={styles.row}>
          Consultorio:{" "}
          <select
            onChange={actualizarEstado}
            name="consultorio"
            value={turno.consultorio.id}
          >
            <option value="1">Consultorio 1</option>
            <option value="2">Consultorio 2</option>
            <option value="3">Consultorio 3</option>
          </select>
        </span>
        <span className={styles.row}>
          Dia:{" "}
          <input
            onChange={actualizarEstado}
            name="dia"
            type="date"
            value={turno.dia}
          />
        </span>
        <span className={styles.row}>
          Hora:{" "}
          <input
            onChange={actualizarEstado}
            name="hora"
            type="time"
            value={turno.hora}
          />
        </span>
        <button className={styles.btn} onClick={actualizarTurno}>
          Actualizar
        </button>
      </div>
    </div>
  );
}
