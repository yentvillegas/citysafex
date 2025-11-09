import { useEffect, useState } from "react"
import ButtonCS from "../components/ButtonCS"
import Mapa from "../components/Mapa"
import PageCS from "../components/PageCS"
import apiCS from "../settings/apiConection";
import { useNavigate } from "react-router-dom";
function Ciudadano() {
    const navigate = useNavigate();
    const [posFinded, setPosFinded] = useState(false);
    const [pos, setPos] = useState([0,0])
    const [oldPoints, setOldPoints] = useState([])
    function alertarAhora() {
        apiCS.post("/alerta",{
            lat:pos[0],
            lng:pos[1],
            dir:"nueva direccion"
        },{
           headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}` 
        },
        }).then(resp=>{
            alert("CASO REPORTADO, SE AVISARÁ A LOS POLICIAS")
        })
    }
    useEffect(()=>{        
        apiCS.get("/alerta",{
             headers: {               
                "Authorization": `Bearer ${localStorage.getItem("jwt")}` 
            },
        }).then(resp=>{
            navigator.geolocation.getCurrentPosition(
            (position) => {
                 const points = resp.data.data.map(a=>{
                    return [a.lat, a.lng, 0.5]
                })
                setOldPoints(points)
                setPos([position.coords.latitude, position.coords.longitude])
                setPosFinded(true)
            }
        )
           
        })
    },[])   
    return <PageCS style={{height:"100%"}}>
        <div style={{height:"100%", width:"100%"}}>
            {posFinded?<Mapa currPoint={pos} oldPoints={oldPoints}/>:<div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100%"}}>CARGANDO MAPA...</div>}
        </div>
        <div style={{width:"100%", display:"flex", justifyContent:"space-between", padding:"1rem"}}>
            <ButtonCS text="Reportar Caso" bg="red" onClick={()=>navigate("/ciudadano/caso")}/>
            <ButtonCS text="Alertar Ahora" bg="red" onClick={alertarAhora}/>
        </div>
    </PageCS>
}
export default Ciudadano