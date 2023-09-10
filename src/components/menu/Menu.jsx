import styles from "./Menu.module.css";
import { Link } from "react-router-dom";
export default function Menu() {
  return (
    <header className={styles.menu}>
      <div className={styles.logo}>
        <p className={styles.title}>Prueba Técnica Certant</p>
      </div>

      <nav className={styles.nav}>
        <Link to={"/inicio"} className={styles.link}>
          Inicio
        </Link>
        <Link to={"/doctores"} className={styles.link}>
          Doctores
        </Link>
        <Link to={"/especialidades"} className={styles.link}>
          Especialidades
        </Link>
        <Link to={"/pacientes"} className={styles.link}>
          Pacientes
        </Link>
        <Link to={"/turnos"} className={styles.link}>
          Turnos
        </Link>
      </nav>
    </header>
  );
}
