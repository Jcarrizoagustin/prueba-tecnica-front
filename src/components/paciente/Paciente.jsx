import styles from "./Paciente.module.css";
export default function Paciente({ paciente }) {
  return (
    <div className={styles.card}>
      <h2>Paciente</h2>
      <h3>Nombre: {paciente.name}</h3>
      <h3>Apellido: {paciente.surname}</h3>
      <h3>Teléfono: {paciente.phone}</h3>
    </div>
  );
}
