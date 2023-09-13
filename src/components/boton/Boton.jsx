import styles from "./Boton.module.css";

export default function Boton({ id, text, color, handleClick }) {
  return (
    <div
      onClick={() => handleClick(id)}
      className={`${styles.boton} ${color === "red" && styles.red}`}
    >
      {text}
    </div>
  );
}
