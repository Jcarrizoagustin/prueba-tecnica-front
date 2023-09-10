import BarraBusqueda from "../busqueda/BarraBusqueda";
import styles from "./PacienteContainer.module.css";
export default function PacienteContainer() {
  return (
    <div className={styles.container}>
      <BarraBusqueda handleChange={(e) => console.log(e)} />
    </div>
  );
}
