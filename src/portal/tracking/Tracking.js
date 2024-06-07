import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import axios from "axios";
import { SERVER } from '../../context/Backend';
import {ComponentCard} from "./ComponentCard";



function Tracking() {
    const {user, getToken} = useContext(UserContext);
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(true)

    let PATADAS=(data.length===0)?[]:data.filter(e=>e.componente==="PATADAS")
    let FLEXIBILIDAD=(data.length===0)?[]:data.filter(e=>e.componente==="FLEXIBILIDAD")
    let OTRO=(data.length===0)?[]:data.filter(e=>e.componente!=="PATADAS"&&e.componente!=="FLEXIBILIDAD")

    const capitalizeFirstLetter=(name)=>{
        let temp='';
        let array=String(name).split(' ')
        array.forEach(string => {
            temp+=string.charAt(0).toUpperCase() + string.slice(1)+' ';
        });
        return temp
    }
    useEffect(() => {
        const config={
            headers:{
                'Access-Control-Allow-Origin': '*',
                'token-clubsue':getToken()
            }
        }
        axios.get(`${SERVER}/report/performance/${user.documento}`,config)
        .then(({data})=>{
            setdata(data)
            setloading(false)
        }).catch(()=>{})
    }, [])
    
    return (
        <>
            <h2 className="title">Hola, { capitalizeFirstLetter(`${String(user.nombres).toLowerCase()} ${String(user.apellidos).toLowerCase()}`)}</h2>
            <br/>
            {((!loading)&&(data.length===0))&&
                <>
                    <p className="text-normal">Por favor solicite a un instructor la evaluación inicial 😀</p>
                    <br/>
                    <div className="img-center-container">
                        <img
                            className="img-center" 
                            src="https://i.ibb.co/0yZNwSJ/checklist.png"
                            alt="Icono de evaluación"
                        />
                    </div>
                </>
            }
            {(data.length>0)&&<>
                <p className="text-bold">Cinta: <span className="text-normal">{data[0]?.cinta||''}</span></p>
                <br/>
                <h2 className="title">Progreso:</h2>
                <div className="progress-div">
                    <ComponentCard  title={'Flexibilidad'} array={FLEXIBILIDAD}/>
                    <ComponentCard  title={'Patadas'} array={PATADAS}/>
                    <ComponentCard  title={'Combate'} array={OTRO}/>
                </div>
            </>}
            
        </>
    );
}

export {Tracking};