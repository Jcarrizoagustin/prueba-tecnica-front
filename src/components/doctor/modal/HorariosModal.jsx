import Horario from "./Horario";
import styles from "./HorariosModal.module.css";

export default function HorariosModal({ doctor, close }) {
  return (
    <>
      <div onClick={() => close()} className={styles.background}></div>
      <div className={styles.container}>
        <div>
          <h2 className={styles.name}>
            <span>Dr/a. </span>
            {doctor.nombre} {doctor.apellido}
          </h2>
          <div className={styles.header}>
            <span>Dia</span>
            <span>Hora</span>
          </div>
          <div className={styles.list}>
            {doctor.horarios.map((horario) => (
              <Horario key={horario.id} horario={horario} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
