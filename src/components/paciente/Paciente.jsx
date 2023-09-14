import styles from "./Paciente.module.css";
import Boton from "../boton/Boton";
export default function Paciente({
  paciente,
  handleClickHistorial,
  handleNuevoTurno,
}) {
  return (
    <div className={styles.card}>
      <span>
        {paciente.nombre} {paciente.apellido}
      </span>
      <span>{paciente.dni}</span>
      <span>{paciente.fechaNacimiento}</span>
      <span>{paciente.telefono}</span>
      <div className={styles.botones}>
        <Boton text={"Historial"} handleClick={handleClickHistorial} />
        <Boton text={"+ Turno"} handleClick={handleNuevoTurno} />
      </div>
    </div>
  );
}
