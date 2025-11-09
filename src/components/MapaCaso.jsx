import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 🔧 FIX: solucionar íconos rotos en React
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

// 📍 Componente para detectar clics
function ClickHandler({ onSelect }) {
  const [pos, setPos] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPos({ lat, lng });
      onSelect({ lat, lng });
    },
  });

  return pos ? (
    <Marker position={pos}>
      <Popup>
        Lat: {pos.lat.toFixed(6)} <br />
        Lng: {pos.lng.toFixed(6)}
      </Popup>
    </Marker>
  ) : null;
}

function MapaCaso({coords, setCoords}) {  
  const [pos, setPos] = useState([0,0])
  useEffect(()=>{
      navigator.geolocation.getCurrentPosition(
          (position) => {
              setPos([position.coords.latitude, position.coords.longitude])
          }
      )
  },[])  
  return (
    pos[0] !==0 && <div style={{ width: "100%", height: "100%" }}>
      <MapContainer
        center={{ lat: pos[0], lng:pos[1] }} // Lima
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onSelect={setCoords} />
      </MapContainer>

      <div style={{ textAlign: "center", padding: "10px" }}>
        {coords ? (
          <p>
            📍 Coordenadas seleccionadas:<br />
            <b>Lat:</b> {coords.lat.toFixed(6)} — <b>Lng:</b> {coords.lng.toFixed(6)}
          </p>
        ) : (
          <p>Haz clic en el mapa para seleccionar un punto.</p>
        )}
      </div>
    </div>
  );
}
export default MapaCaso