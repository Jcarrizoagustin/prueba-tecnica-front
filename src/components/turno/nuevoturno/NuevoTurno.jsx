import toast from "react-hot-toast";
import styles from "./NuevoTurno.module.css";
import SeleccionarDoctor from "./seleccionardoctor/SeleccionarDoctor";
import { useRef, useState } from "react";

export default function NuevoTurno({ close, id }) {
  const [seleccionado, setSeleccionado] = useState(false);
  const [doctor, setDoctor] = useState({});

  const consultorio = useRef();
  const dia = useRef();
  const hora = useRef();

  const seleccionarDoctor = (e) => {
    setDoctor(e);
    setSeleccionado(true);
  };

  const postInfo = async () => {
    const payload = {
      doctor_id: doctor.id,
      paciente_id: id,
      consultorio_id: parseFloat(consultorio.current.value),
      dia: dia.current.value,
      hora: hora.current.value,
    };
    try {
      const res = await fetch("http://localhost:8080/api/v1/turnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Turno agregado con exito");
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div onClick={() => close()} className={styles.background}></div>
      <div className={styles.container}>
        <h2 className={styles.h2}>Nuevo Turno</h2>
        <div className={styles.input}>
          <label htmlFor="dia">Dia</label>
          <input ref={dia} type="date" />
        </div>
        <div className={styles.input}>
          <label htmlFor="hora">Hora</label>
          <input
            ref={hora}
            type="time"
            id="hora"
            name="hora"
            min="08:00"
            max="22:30"
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="consultorio">Consultorio</label>
          <select ref={consultorio} name="" id="consultorio">
            <option value="1">Consultorio 1</option>
            <option value="2">Consultorio 2</option>
            <option value="3">Consultorio 3</option>
          </select>
        </div>

        <div>
          <h2 className={styles.h2}>Doctor/a</h2>
          {seleccionado ? (
            <h2 className={styles.h2}>
              Dr/a {doctor.nombre} {doctor.apellido}
            </h2>
          ) : (
            <SeleccionarDoctor handleClick={seleccionarDoctor} />
          )}
        </div>
        <div className={styles.button} onClick={() => postInfo()}>
          Enviar
        </div>
      </div>
      ;
    </>
  );
}
