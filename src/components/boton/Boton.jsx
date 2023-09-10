import styles from "./Boton.module.css";

export default function Boton({ text }) {
  return <div className={styles.boton}>{text}</div>;
}
