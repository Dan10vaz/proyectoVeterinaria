import Paciente from "../models/Paciente.js";

const agregarPacientes = async (req, res) => {
  const paciente = new Paciente(req.body);
  paciente.veterinario = req.veterinario._id;
  try {
    const pacienteAlmacenado = await paciente.save();
    res.json(pacienteAlmacenado);
  } catch (error) {
    console.log(error);
  }
};
const obtenerPacientes = async (req, res) => {
  //Nos traemos a los pacientes registrados de cada veterinario
  const pacientes = await Paciente.find()
    .where("veterinario")
    .equals(req.veterinario);

  res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
  //Validamos que la persona que lo creo lo pueda ver
  const { id } = req.params;
  const paciente = await Paciente.findById(id); //Buscamos por id

  if (!paciente) {
    res.status(404).json({ msg: "No encontrado" });
  }

  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: "Accion no valida" });
  }

  res.json(paciente);
};

const actualizarPaciente = async (req, res) => {
  //Validamos que la persona que lo creo lo pueda editar
  const { id } = req.params;
  const paciente = await Paciente.findById(id); //Buscamos por id

  if (!paciente) {
    res.status(404).json({ msg: "No encontrado" });
  }

  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: "Accion no valida" });
  }

  //Actualizar Paciente
  //En caso de que no se cambie algo dejar lo que ya tiene el objeto de la base de datos
  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.propietario = req.body.propietario || paciente.propietario;
  paciente.email = req.body.email || paciente.email;
  paciente.fecha = req.body.fecha || paciente.fecha;
  paciente.sintomas = req.body.sintomas || paciente.sintomas;

  try {
    const pacienteActualizado = await paciente.save();
    res.json(pacienteActualizado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarPaciente = async (req, res) => {
  //Validamos que la persona que lo creo lo pueda eliminar
  const { id } = req.params;
  const paciente = await Paciente.findById(id); //Buscamos por id

  if (!paciente) {
    res.status(404).json({ msg: "No encontrado" });
  }

  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.json({ msg: "Accion no valida" });
  }

  try {
    await paciente.deleteOne();
    res.json({ msg: "Paciente eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export {
  agregarPacientes,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
