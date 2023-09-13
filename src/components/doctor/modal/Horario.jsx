import styles from "./Horario.module.css";
export default function Horario({ horario }) {
  const getDia = (dia) => {
    switch (dia) {
      case 1:
        return "Lunes";
      case 2:
        return "Martes";
      case 3:
        return "Miercoles";
      case 4:
        return "Jueves";
      case 5:
        return "Viernes";
      case 6:
        return "Sabado";
    }
  };

  const dia = getDia(horario.diaDeLaSemana);

  return (
    <div className={styles.card}>
      <span>{dia}</span>
      <span>
        {horario.horaInicio} - {horario.horaFin}
      </span>
    </div>
  );
}
