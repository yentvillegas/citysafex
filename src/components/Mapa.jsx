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


function HeatmapLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    const heat = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    });
    heat.addTo(map);
    return () => map.removeLayer(heat);
  }, [map, points]);

  return null;
}

function Mapa({ currPoint, oldPoints }) {
  return (
    <MapContainer center={currPoint} zoom={13} style={{height:"100%"}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <HeatmapLayer points={oldPoints} />
      <Marker position={currPoint}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
export default Mapa