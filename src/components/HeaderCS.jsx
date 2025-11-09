import { useEffect } from "react"
import { useNavigate, useLocation  } from "react-router-dom";

import './HeaderCS.css'
import ButtonCS from "./ButtonCS";
import apiCS from "../settings/apiConection";
function HeaderCS({hasJWT, setHasJWT}) {
    const navigate = useNavigate();
    const location = useLocation();
    function exit() {
        //apiCS.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("jwt")
        //setHasJWT(false)
        window.location.reload()     
       
    }
    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            setHasJWT(true)
        }
    }, [])
    return (
        <div className='HeaderCS'>
            <div>                
                {!hasJWT && <ButtonCS text="<" bg="gray"  onClick={()=>navigate("/")}/>}
            </div>
            <div className="HeaderCS_actions">
                {hasJWT ? <>
                    <ButtonCS text="SALIR" bg="red" onClick={()=>exit()} />
                </> :
                    <>
                        {location.pathname !== "/register" && <ButtonCS text="REGISTRARME" bg="blue" onClick={()=>navigate("/register")}/>}
                        {location.pathname !== "/login" && <ButtonCS text="INGRESAR" bg="green"  onClick={()=>navigate("/login")}/>}
                    </>}
            </div>
           

        </div>
    )
}

export default HeaderCS