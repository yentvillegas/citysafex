import { useEffect, useState } from "react"
import ButtonCS from "../components/ButtonCS"
import PageCS from "../components/PageCS"
import apiCS from "../settings/apiConection";
import MapaCaso from "../components/MapaCaso";
import { useNavigate } from "react-router-dom";

function CiudadanoCaso() {
    const [coords, setCoords] = useState(null);
    const navigate  = useNavigate();
    function handleReportCase() {
        apiCS.post("/alerta",{...coords, isActive: false, dir:"otra direccion"},{
           headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}` 
        }}).then(resp=>{
            alert("CASO AGREGADO")
            navigate("/ciudadano")
        })
    }
    return <PageCS style={{height:"100%"}}>
        <div style={{height:"100%", width:"100%"}}>
             <MapaCaso coords={coords} setCoords={setCoords}/>
        </div>
        <div style={{width:"100%", display:"flex", justifyContent:"end", padding:"1rem"}}>
            <ButtonCS text="Reportar Caso" bg="red" onClick={handleReportCase}/>
        </div>
    </PageCS>
}
export default CiudadanoCaso