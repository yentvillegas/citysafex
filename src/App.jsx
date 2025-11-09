import { useEffect, useState } from 'react'
import './App.css'
import Layout from './components/Layout'
function App() {
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Permiso aceptado", position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("Error al obtener ubicación:", error);
      }
    );
  },[])
  return (
   <div className='App'><Layout/></div>
  )
}

export default App
