import { useEffect, useState } from "react";
import BarraBusqueda from "../busqueda/BarraBusqueda";
import Doctor from "./Doctor";
import styles from "./DoctorContainer.module.css";
import HorariosModal from "./modal/HorariosModal";

export default function DoctorContainer() {
  const [doctoresApi, setDoctoresApi] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [doctor, setDoctor] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const mostrarModal = (id) => {
    setShowModal(true);
    setDoctor(id);
  };

  const ocultarModal = () => setShowModal(false);

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/doctores");

      const data = await res.json();

      if (res.ok) {
        setDoctoresApi(data);
        setDoctores(data);
      } else {
        throw new Error("Error al obtener los doctores");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filtrarPorNombre = (nombre) => {
    const filtro = doctoresApi.filter(
      (e) =>
        e.nombre.toLowerCase().startsWith(nombre.toLowerCase()) ||
        e.apellido.toLowerCase().startsWith(nombre.toLowerCase())
    );
    setDoctores(filtro);
  };

  const filtrarPorEspecialidad = (especialidad) => {
    if (especialidad === "todos") {
      setDoctores(doctoresApi);
    } else {
      const filtro = doctoresApi.filter(
        (e) =>
          e.especialidad.descripcion.toLowerCase() ===
          especialidad.toLowerCase()
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
          <Doctor
            key={doctor.id}
            doctor={doctor}
            hadleClick={() => mostrarModal(doctor)}
          />
        ))}
      </div>
      {showModal && <HorariosModal close={ocultarModal} doctor={doctor} />}
    </div>
  );
}
