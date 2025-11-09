import { useState } from "react";
import InputCS from "../components/InputCS";
import PageCS from "../components/PageCS";
import { useNavigate } from "react-router-dom";
import apiCS from "../settings/apiConection";

function Login({setHasJWT}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { data: { token, isPolice } } = await apiCS.post("/login", formData);
            localStorage.setItem("jwt", token);
            //apiCS.defaults.headers.common["Authorization"] = "Bearer " + token;
            setHasJWT(true)
            setTimeout(()=>{
                if (isPolice) {
                    navigate("/policia")
                } else {
                    navigate("/ciudadano")
                }
            },200)           
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
                    Login de Usuario
                </h2>
                <InputCS
                    lbl="Correo electrónico"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                />
                <InputCS
                    lbl="Contraseña"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="off"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
                >
                    Ingresar
                </button>
            </form>
        </PageCS>
    );
}
export default Login