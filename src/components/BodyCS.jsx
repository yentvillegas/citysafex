import {  Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Ciudadano from "../pages/Ciudadano";
import CiudadanoCaso from "../pages/CiudadanoCaso";
import Policia from "../pages/Policia";

function BodyCS({setHasJWT}) {

  return (
   <div className='BodyCS'>
    <Routes>
      <Route path="/" element={<Home />}  />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login setHasJWT={setHasJWT} />} />
      <Route path="/ciudadano" element={<Ciudadano />} />
      <Route path="/ciudadano/caso" element={<CiudadanoCaso />} />
      <Route path="/policia" element={<Policia />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
   </div>
  )
}

export default BodyCS