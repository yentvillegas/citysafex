import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import cors from "cors"
import path from "path";
import Usuario from "./models/Usuario.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import jwt from "jsonwebtoken";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { validateToken } from "./middleware/auth.js";
import Alert from "./models/Alert.js";
const app = express();
const SECRET_KEY = process.env.SECRET_KEY; // ⚠️ usa una variable de entorno en producción

// Permitir JSON en peticiones
app.use(express.json());
app.use(cors())
// Servir archivos estáticos desde "dist"
app.use(express.static(path.join(__dirname, "../dist")));

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// crear usuario
app.post("/api/usuario", async (req, res) => {
  try {
    const nuevoData = new Usuario(req.body);
    await nuevoData.save();
    res.status(201).json({ mensaje: "Usuario guardado", usuario: nuevoData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.post("/api/alerta", validateToken, async (req, res) => {
  try {
    const user = await Usuario.findOne({email: req.tokenDecoded.email});
    const nuevoData = new Alert({...req.body, userId: user._id});
    await nuevoData.save();
    res.status(201).json({ mensaje: "Alerta guardada", alerta: nuevoData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/alerta", validateToken, async (req, res) => {
  try {
    const {email}= req.tokenDecoded;
    const usuario = await Usuario.findOne({email});
    console.log(email)
    if(!usuario){
       res.status(400).json({ error: "No existe el usuario" });
    }
    const data = await Alert.find({isActive: usuario.isPolice}).populate("userId")
    res.status(201).json({ mensaje: "Alertas obtenidas", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch("/api/alerta/:id", validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = await Alert.findByIdAndUpdate(id, { $set: { isActive: false } }, { new: true });
    res.status(201).json({ mensaje: "Alerta guardada", alerta: updatedData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// app.get("/api/usuario", validateToken, async (req, res) => {
//   try {
//     const list = await Usuario.find();
//     res.status(201).json({ usuarios: list });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("data login", req.body)
  const usuario = await Usuario.findOne({ email, password })
  if (usuario) {
    const token = jwt.sign(
      { email: usuario.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.status(200).send({ token, isPolice: usuario.isPolice });
  } else {
    res.status(404).send({ error: 'Credenciales incorrectas.' });
  }
});

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
  });

// Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
