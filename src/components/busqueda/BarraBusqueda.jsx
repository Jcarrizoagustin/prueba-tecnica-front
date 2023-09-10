import { useEffect, useState } from "react";
import styles from "./BarraBusqueda.module.css";

export default function BarraBusqueda({ handleChange }) {
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    console.log(busqueda);
  }, [busqueda]);

  return (
    <input
      onChange={(e) => {
        setBusqueda(e.target.value);
        handleChange(e.target.value);
      }}
      className={styles.busqueda}
      value={busqueda}
      type="text"
      placeholder="Buscar"
    />
  );
}
