import { useEffect, useState } from "react"
import ButtonCS from "../components/ButtonCS"
import Mapa from "../components/Mapa"
import PageCS from "../components/PageCS"
import apiCS from "../settings/apiConection";
import { useNavigate } from "react-router-dom";
import MapaPolicia from "../components/MapaPolicia";

function Policia() {
    const navigate = useNavigate();
    const [posFinded, setPosFinded] = useState(false);
    const [pos, setPos] = useState([0,0])
    const [oldPoints, setOldPoints] = useState([])
     const [seleccionado, setSeleccionado] = useState(null);
    function reviewCase() {
        apiCS.patch(`/alerta/${seleccionado.id}`,{},{
           headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}` 
        }}).then(resp=>{
            getData()
            setSeleccionado(null)
        })

    }
    const handleMarkerClick = (id) => {
        setSeleccionado(id);
    };
    function getData() {
         navigator.geolocation.getCurrentPosition(
            (position) => {
                setPos([position.coords.latitude, position.coords.longitude])
                setPosFinded(true)
            }
        )
      
        apiCS.get("/alerta",{
           headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}` 
        }}).then(resp=>{
            const points = resp.data.data.map(a=>{
                return  { id: a._id, nombre: a.userId.name, lat: a.lat, lng: a.lng }
            })
            setOldPoints(points)
        })
    }
    useEffect(()=>{
       getData()
    },[])   
    return <PageCS style={{height:"100%"}}>
        <div style={{height:"100%", width:"100%"}}>
            {posFinded?<MapaPolicia currPoint={pos} puntos={oldPoints} handleMarkerClick={handleMarkerClick} />:<div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100%"}}>SE NECESITA ACCESO A LA UBICACION</div>}
        </div>
        <div style={{width:"100%", display:"flex", justifyContent: seleccionado? "space-between":"end", padding:"1rem"}}>
            {seleccionado && <ButtonCS text={ "MARCAR COMO REVISADO: "+seleccionado.nombre} bg="red" onClick={reviewCase}/>}
            <ButtonCS text="ACTUALIZAR" bg="red" onClick={getData}/>
        </div>
    </PageCS>
}
export default Policia