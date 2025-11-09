import { useState } from "react";
import BodyCS from "./BodyCS"
import HeaderCS from "./HeaderCS"
import { BrowserRouter } from "react-router-dom";

function Layout() {
  const [hasJWT, setHasJWT] = useState(false);
  return (
    <BrowserRouter>
      <div className='Layout'>
        <HeaderCS hasJWT={hasJWT} setHasJWT={setHasJWT} />
        <BodyCS  hasJWT={hasJWT} setHasJWT={setHasJWT} />
      </div>
    </BrowserRouter>
  
  )
}

export default Layout