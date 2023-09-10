import styles from "./Menu.module.css";
export default function Menu() {
  return (
    <header className={styles.menu}>
      <div className={styles.logo}>
        <p className={styles.title}>Prueba Técnica Certant</p>
      </div>
      <nav className={styles.nav}>
        <li className={styles.link}>Inicio</li>
        <li className={styles.link}>Doctores</li>
        <li className={styles.link}>Especialidades</li>
        <li className={styles.link}>Pacientes</li>
        <li className={styles.link}>Turnos</li>
      </nav>
    </header>
  );
}
