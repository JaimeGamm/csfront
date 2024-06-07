import { useState, useContext } from "react";
import { useResolution } from "../../resolution/useResolution";
import {ViewContext} from "../../context/ViewProvider";


function Nav() {
    
    const [menu, setMenu] = useState(false);
    const {setView}= useContext(ViewContext);

    return ( 
        <nav className="nav-principal">
            {useResolution()==='DESKTOP'&&
                <ul>
                    <a href="#about" className="link-nav-principal">Acerca de</a>
                    <a href="#contact" className="link-nav-principal">Contacto</a>
                </ul>
            }
            {useResolution()==='MOBILE'&&
                <button type="button" className="img-icon"
                    onClick={()=>setMenu(true)}
                > <img src="https://i.ibb.co/0M110GD/menu-1.png" alt="Icono de menu"/></button>
            }
            {!!menu&&
                <div className="menu">
                    <button className="menu-button" onClick={()=>setMenu(false)}>x</button>
                    <a href="#about" className="link-menu">Acerca de</a>
                    <a href="#contact" className="link-menu">Contacto</a>
                </div>
            }
            <span>CLUB SUE</span>
            <button className="dark-button" type="button" onClick={()=>setView('LOGIN')}>Iniciar sesión</button>
        </nav>
    );
}

export {Nav};