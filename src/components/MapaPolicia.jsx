import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap, Popup } from "react-leaflet";
import "leaflet.heat";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({ //solo aplica despues del build
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});
const iconRojo = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function MapaPolicia({ currPoint, puntos, handleMarkerClick }) {
  return (
    <MapContainer center={currPoint} zoom={13} style={{height:"100%"}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={currPoint}>
        <Popup>Tu ubicación actual</Popup>
      </Marker>
      {puntos.map((punto) => (
        <Marker key={punto.id} position={[punto.lat, punto.lng]}  icon={iconRojo}  eventHandlers={{
            click: () => handleMarkerClick(punto),
          }}>
          <Popup>{punto.nombre}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
export default MapaPolicia