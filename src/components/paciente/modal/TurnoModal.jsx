import styles from "./TurnoModal.module.css";
export default function TurnoModal({ turno }) {
  return (
    <div className={styles.card}>
      <span>
        {turno.paciente.nombre} {turno.paciente.apellido}
      </span>
      <span>
        {turno.doctor.nombre} {turno.doctor.apellido}
      </span>
      <span>{turno.dia}</span>
      <span>{turno.hora}</span>
      <span>{turno.consultorio.descripcion}</span>
    </div>
  );
}
