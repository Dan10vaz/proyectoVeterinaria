import mongoose from "mongoose";

const pacienteSchema = mongoose.Schema(
  {
    nombre: {
      type: String, // de tipo string
      require: true, // es obligatorio
    },
    propietario: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    fecha: {
      type: Date,
      require: true,
      default: Date.now(),
    },
    sintomas: {
      type: String,
      require: true,
    },
    veterinario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veterinario",
    },
  },

  {
    timestamps: true,
  }
);

const Paciente = mongoose.model("Paciente", pacienteSchema);

export default Paciente;
