import { useState } from "react";
import styles from "./AltaPaciente.module.css";
import toast from "react-hot-toast";

export default function AltaPaciente() {
  const [nuevoPaciente, setNuevoPaciente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    fechaNacimiento: "",
    correo: "",
  });
  const [datosValidados, setDatosValidados] = useState(false);

  const validarDatos = () => {
    if (nuevoPaciente.nombre.length < 2) {
      return false;
    }
    if (nuevoPaciente.nombre.length < 2) {
      return false;
    }
    if (
      !nuevoPaciente.correo.includes("@") &&
      !nuevoPaciente.correo.includes(".")
    ) {
      return false;
    }

    if (nuevoPaciente.dni.length != 8) {
      return false;
    }
    if (nuevoPaciente.fechaNacimiento.length < 2) {
      return false;
    }

    return true;
  };

  const actualizarEstado = (e) => {
    const { name, value } = e.target;
    setNuevoPaciente((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    const data = validarDatos();
    setDatosValidados(data);
  };

  const agregarPaciente = async () => {
    if (datosValidados) {
      try {
        const res = await fetch("http://localhost:8080/api/v1/pacientes", {
          method: "POST",
          body: JSON.stringify(nuevoPaciente),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok) {
          toast.success("Paciente agregado con exito");
          setNuevoPaciente({
            nombre: "",
            apellido: "",
            dni: "",
            telefono: "",
            fechaNacimiento: "",
            correo: "",
          });
        } else {
          toast.error("Ocurrio un error");
        }
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    } else {
      toast.error("Campos en el formulario incompletos o incorrectos");
    }
  };

  return (
    <form className={styles.container}>
      <h2>Agregar paciente</h2>
      <div className={styles.formImput}>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={nuevoPaciente.nombre}
          onChange={(e) => actualizarEstado(e)}
        />
      </div>

      <div className={styles.formImput}>
        <label htmlFor="apellido">Apellido</label>
        <input
          id="apellido"
          type="text"
          name="apellido"
          value={nuevoPaciente.apellido}
          onChange={(e) => actualizarEstado(e)}
        />
      </div>

      <div className={styles.formImput}>
        <label htmlFor="dni">Dni</label>
        <input
          id="dni"
          type="text"
          onChange={(e) => actualizarEstado(e)}
          value={nuevoPaciente.dni}
          name="dni"
        />
      </div>

      <div className={styles.formImput}>
        <label htmlFor="telefono">Telefono</label>
        <input
          id="telefono"
          type="text"
          name="telefono"
          value={nuevoPaciente.telefono}
          onChange={(e) => actualizarEstado(e)}
        />
      </div>

      <div className={styles.formImput}>
        <label htmlFor="correo">Correo</label>
        <input
          id="correo"
          type="text"
          name="correo"
          onChange={(e) => actualizarEstado(e)}
          value={nuevoPaciente.correo}
        />
      </div>

      <div className={styles.formImput}>
        <label htmlFor="fecha_nacimiento">Fecha Nacimiento</label>

        <input
          id="fecha_nacimiento"
          type="date"
          name="fechaNacimiento"
          value={nuevoPaciente.fechaNacimiento}
          onChange={(e) => actualizarEstado(e)}
        />
      </div>

      <div onClick={agregarPaciente} className={styles.btn}>
        Agregar
      </div>
    </form>
  );
}
