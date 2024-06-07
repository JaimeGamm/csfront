import { useContext } from "react";

import { UserContext } from "../../context/UserProvider";

function Logout( {menuItem}) {
    const {logout} = useContext(UserContext);
    return (
        <div className="logout">
            <h2 className="title">¿Seguro quiere cerrar sesión?</h2>
            <div className="img-center-container">
                <img
                    className="img-center" 
                    src="https://i.ibb.co/Pcyz2Tr/karate.png"
                    alt="Saludo de Taekwondo"
                />
            </div>
            <br/>
            <button className="form-orange-button" style={{marginTop:'20px'}} onClick={()=>{menuItem('');logout()}}>Cerrar sesión</button>
        </div>
    );
}

export {Logout};