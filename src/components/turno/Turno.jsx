import styles from "./Turno.module.css";
import Boton from "../boton/Boton";
import toast from "react-hot-toast";

export default function Turno({ turno, data, openModalModificar }) {
  const cancelarTurno = async (id) => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/turnos/" + id, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Turno cancelado con exito");
      } else {
        toast.error("El turno no se puede cancelar, es en menos de 1 hora");
        throw new Error(data);
      }
    } catch (error) {
      console.error("Error");
    } finally {
      data();
    }
  };

  const handleCancelarTurno = (id) => {
    toast(
      (t) => (
        <span>
          Seguro de que quiere cancelar el turno ?
          <div
            style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              marginTop: ".5rem",
            }}
          >
            <button
              onClick={() => {
                cancelarTurno(id);
                toast.dismiss(t.id);
              }}
            >
              ✔️
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
              }}
            >
              ❌
            </button>
          </div>
        </span>
      ),
      {
        style: {
          width: "400px",
        },
      }
    );
  };

  return (
    <div className={styles.turno}>
      <span>
        {turno.paciente.nombre} {turno.paciente.apellido}
      </span>
      <span>
        {turno.doctor.nombre} {turno.doctor.apellido}
      </span>
      <span>{turno.consultorio.descripcion}</span>
      <span>{turno.dia}</span>
      <span>{turno.hora}</span>
      <div className={styles.botones}>
        <Boton
          id={turno.id}
          text={"Cancelar"}
          color={"red"}
          handleClick={handleCancelarTurno}
        />
        <Boton
          id={turno.id}
          text={"Modificar"}
          handleClick={openModalModificar}
        />
      </div>
    </div>
  );
}
