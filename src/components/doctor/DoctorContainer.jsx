import { useEffect, useState } from "react";
import BarraBusqueda from "../busqueda/BarraBusqueda";
import Doctor from "./Doctor";
import styles from "./DoctorContainer.module.css";

const data = [
  { id: 1, nombre: "Juan Lopez", especialidad: "Clinica Medica" },
  { id: 2, nombre: "Luciana Rodriguez", especialidad: "Pediatria" },
  { id: 3, nombre: "Sreva Kuchnic", especialidad: "Cardiologia" },
  { id: 4, nombre: "Antonio Cazal", especialidad: "Clinica Medica" },
  { id: 5, nombre: "Marcela Gutierrez", especialidad: "Dermatologia" },
  { id: 6, nombre: "Juan Martin Andrada", especialidad: "Clinica Medica" },
  { id: 7, nombre: "María Rodríguez", especialidad: "Pediatria" },
  { id: 8, nombre: "Carlos González", especialidad: "Cardiologia" },
  { id: 9, nombre: "Laura Martínez", especialidad: "Clinica Medica" },
  { id: 10, nombre: "Antonio Pérez", especialidad: "Dermatologia" },
  { id: 11, nombre: "Ana Sánchez", especialidad: "Clinica Medica" },
  { id: 12, nombre: "Luis Ramírez", especialidad: "Pediatria" },
  { id: 13, nombre: "Carmen Fernández", especialidad: "Cardiologia" },
  { id: 14, nombre: "Pedro García", especialidad: "Clinica Medica" },
  { id: 15, nombre: "Sofia Torres", especialidad: "Dermatologia" },
];
export default function DoctorContainer() {
  const [doctores, setDoctores] = useState(data);

  const filtrarPorNombre = (nombre) => {
    const filtro = data.filter((e) =>
      e.nombre.toLowerCase().startsWith(nombre.toLowerCase())
    );
    setDoctores(filtro);
  };

  const filtrarPorEspecialidad = (especialidad) => {
    if (especialidad === "todos") {
      setDoctores(data);
    } else {
      const filtro = data.filter(
        (e) => e.especialidad.toLowerCase() === especialidad.toLowerCase()
      );
      setDoctores(filtro);
    }
  };

  useEffect(() => {
    console.log(doctores);
  }, [doctores]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BarraBusqueda handleChange={filtrarPorNombre} />
        <div>
          <select
            className={styles.lista}
            name="especialidades"
            id="especialidades"
            onChange={(e) => filtrarPorEspecialidad(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="clinica medica">Clinica Medica</option>
            <option value="dermatologia">Dermatologia</option>
            <option value="cardiologia">Cardiologia</option>
            <option value="pediatria">Pediatria</option>
          </select>
        </div>
      </div>
      <div className={styles.list}>
        {doctores.map((doctor) => (
          <Doctor key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}
