import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  lat: { type: String, required: true },
  lng: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // 👈 le dices a qué modelo pertenece ese _id
  },
  dir: { type: String, required: true },
  isActive: {type: Boolean, default: true}, //para saber si es un caso que los policias deban atender
  intensity:{type: Number, default:0.5},
  createdAt: { type: Date, default: Date.now }
});

const Alert = mongoose.model("alerts", alertSchema);
export default Alert;
