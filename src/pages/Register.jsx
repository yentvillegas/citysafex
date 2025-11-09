import { useState } from "react";
import PageCS from "../components/PageCS";
import InputCS from "../components/InputCS";
import apiCS from "../settings/apiConection";
import { useNavigate } from "react-router-dom";
const DEFAULT_FORM_DATA = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isPolice: false,
    cip: ""
  }
function Register() {
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(DEFAULT_FORM_DATA)));
  const navigate = useNavigate();
  const handleChange = (e) => {
    if(e.target.type==="radio"){
      setFormData({ ...formData, [e.target.name]: JSON.parse(e.target.value) });
    }else{
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }   
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.confirmPassword !== formData.password) {
      alert("Las contraseñas no coinciden")
      return
    }
    const {confirmPassword, ...dataToSend} = formData
    try {
      const resp = await apiCS.post("/usuario", dataToSend);
      alert(resp.data.mensaje)
      navigate("/login")     
    } catch (error) {
      alert(error.response.data.error)
    }
   
  }
  return (
    <PageCS>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Registro de Usuario
        </h2>
        <div className="flex w-full rounded-lg overflow-hidden border border-gray-300 mb-4">
          {/* Opción 1 */}
          <label
            className={`flex-1 text-center px-4 py-2 cursor-pointer select-none transition-all ${!formData.isPolice
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            <input
              type="radio"
              name="isPolice"
              value={false}
              checked={!formData.isPolice}
              onChange={handleChange}
              className="hidden"
            />
            SOY CIUDADANO
          </label>

          {/* Opción 2 */}
          <label
            className={`flex-1 text-center px-4 py-2 cursor-pointer select-none transition-all ${formData.isPolice
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            <input
              type="radio"
              name="isPolice"
              value={true}
              checked={formData.isPolice}
              onChange={handleChange}
              className="hidden"
            />
            SOY POLICIA
          </label>
        </div>
         <InputCS 
          lbl="Nombre completo"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre"
        />
        <InputCS 
          lbl="Correo electrónico"  
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="correo@ejemplo.com"
        />
        {formData.isPolice && <InputCS 
          lbl="CIP"  
          name="cip"
          value={formData.cip}
          onChange={handleChange}
          placeholder="00000"
          required={formData.isPolice}
        />}
        <InputCS 
          lbl="Contraseña"  
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          autoComplete="off"
        />
        <InputCS 
          lbl="Confirmar contraseña"  
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          autoComplete="off"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
        >
          Registrarme
        </button>
      </form>
    </PageCS>
  );
}
export default Register