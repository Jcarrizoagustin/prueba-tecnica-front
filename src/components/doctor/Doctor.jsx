import Boton from "../boton/Boton";
import styles from "./Doctor.module.css";
export default function Doctor({ doctor, hadleClick, buttonText }) {
  return (
    <div className={styles.doctorCard}>
      <span className={styles.name}>
        <span className={styles.dr}>Dr/a.</span> {doctor.nombre}{" "}
        {doctor.apellido}
      </span>
      <span className={styles.especialidad}>
        {doctor.especialidad.descripcion.replace(
          doctor.especialidad.descripcion.charAt(0),
          doctor.especialidad.descripcion.charAt(0).toUpperCase()
        )}
      </span>
      <Boton text={buttonText || "Horarios"} handleClick={hadleClick} />
    </div>
  );
}
