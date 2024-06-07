import { useState, useContext } from "react";
import { useResolution } from "../../resolution/useResolution";
import {ViewContext} from "../../context/ViewProvider";
import { UserContext } from "../../context/UserProvider";


function NavPortal({item, setItem}) {
    
    const [menu, setMenu] = useState(false);
    const {view,setView}= useContext(ViewContext);
    const { getMenu, validateUser} = useContext(UserContext);

    const resolution=useResolution();
    const items=getMenu();

    return ( 
        <nav className="nav-principal">
            {(validateUser&&resolution!=='MOBILE')&&<span></span>}
            {(view==='LOGIN'||view==='SINGUP')&&<button className="dark-button" type="button" onClick={()=>setView('HOMEPAGE')}>Regresar</button>}
            {((validateUser)&&(resolution==='MOBILE'))&&
                <button type="button" className="img-icon"
                onClick={()=>setMenu(true)}
                > <img src="https://i.ibb.co/0M110GD/menu-1.png" alt="Icono de  menú"/></button>
            }
            {(resolution==='MOBILE'&&menu&&validateUser)&&
                <div className="menu">
                    <button className="menu-button" onClick={()=>setMenu(false)}>x</button>
                    <p></p>
                    {items.map((e)=>(
                        <div className={(e===item)?"link-menu-orange":"link-menu"} onClick={()=>setItem(e)}>{e}</div>
                        ))}
                </div>
            }
            <span>CLUB SUE</span>
            <img className="mini-logo" src="https://i.ibb.co/s3pJPqG/clubsuelogo-removebg-preview.png" alt="Logo academía club sue"/>
        </nav>
    );
}

export {NavPortal};