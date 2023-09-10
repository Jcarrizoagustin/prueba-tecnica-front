import Boton from "../boton/Boton";
import styles from "./Doctor.module.css";
export default function Doctor({ doctor }) {
  return (
    <div className={styles.doctorCard}>
      <span className={styles.name}>Dr. {doctor.nombre}</span>
      <span className={styles.especialidad}>{doctor.especialidad}</span>
      <Boton text={"Horarios"} />
    </div>
  );
}
