import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isPolice: {type: Boolean, default: false},
  cip: { type: String, required: function(){
    return this.isPolice
  } },
  createdAt: { type: Date, default: Date.now }
});

const Usuario = mongoose.model("users", usuarioSchema);
export default Usuario;
