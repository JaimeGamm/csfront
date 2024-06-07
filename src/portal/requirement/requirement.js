import { useState, useContext,useEffect } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserProvider";
import { SERVER } from "../../context/Backend";
import axios from "axios";

function Requirement() {
    const {getToken} = useContext(UserContext)
    const [requisito, setRequisito] = useState('')
    const [cinta, setCinta] = useState('-1')
    const [listCintas, setlistCintas] = useState([])
    const [componente, setComponente] = useState('-1')
    const [listComponentes, setListcomponentes] = useState([])
    const [menores, setMenores] = useState('')
    const [normal, setNormal] = useState('')

    useEffect(() => {
        reload()
    }, [])
    

    const reload=()=>{
        setRequisito('')
        const config={
            headers:{
                'Access-Control-Allow-Origin': '*',
                'token-clubsue':getToken()
            }
        }
        setCinta('-1')
        axios.get(`${SERVER}/belt/`,config)
        .then(({data})=>setlistCintas(data))
        .catch(()=>{})
        setComponente('-1')
        axios.get(`${SERVER}/component/`,config)
        .then(({data})=>setListcomponentes(data))
        .catch(()=>{})

    }

    const handleClick=()=>{
        if (requisito&&cinta!=='-1'&&componente!=='-1'&&menores&&normal) {
            const config={
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    'token-clubsue':getToken()
                }
            }
            axios.post(`${SERVER}/requirement/`, {requisito, cinta, componente, menores, normal} , config)
            .then(()=>{
                reload()
                Swal.fire({
                    icon: 'success',
                    text: `Se ha añadido el requisito`,
                    confirmButtonColor:'#fe6601'
                })
            }).catch(e=>{
                Swal.fire({
                    icon: 'error',
                    text: `${e.response.data}`,
                    confirmButtonColor:'#fe6601'
                })
            })
        } else {
            Swal.fire({
                icon: 'error',
                text: `Por favor rellene los campos obligatorios`,
                confirmButtonColor:'#fe6601'
            })
        }
    }

    return (
        <form className="form-normal">
            <h2 className="title">Agregar Requisito</h2> 
            <p className="text-normal">Por favor rellene los campos obligatorios (<span className="red">*</span>). </p>
            <label className="field-form">
                <p>Requisito<span className="red">*</span>:</p>
                <textarea placeholder="Ingrese un nombre de requisito" value={requisito} onChange={e=>{setRequisito(e.target.value)}}/>
            </label>
            <label className="field-form">
                <p>Cinta<span className="red">*</span>:</p>
                <select value={cinta} onChange={e=>setCinta(e.target.value)}>
                    <option className="option" value='-1'>SELECCIONE UNA CINTA</option>
                    {listCintas.map(e=>(
                        <option className="option" value={`${e.id}`}>{e.nombre}</option>
                    ))}
                </select>
            </label>
            <label className="field-form">
                <p>Componente<span className="red">*</span>:</p>
                <select value={componente} onChange={e=>setComponente(e.target.value)}>
                    <option className="option" value='-1'>SELECCIONE UN COMPONENTE</option>
                    {listComponentes.map(e=>(
                        <option className="option" value={`${e.id}`}>{e.nombre}</option>
                    ))}
                </select>
            </label>
            <h2 className="title">  Poomse:</h2>
            <label className="field-form">
                <p>Menores de 9 años<span className="red">*</span>:</p>
                <textarea placeholder="Ingrese el item de calificación para menores de 9 años" value={menores} onChange={e=>{setMenores(e.target.value)}}/>
            </label>
            <label className="field-form">
                <p>Mayores de 9 años<span className="red">*</span>:</p>
                <textarea placeholder="Ingrese el item de calificación para mayores de 9 años" value={normal} onChange={e=>{setNormal(e.target.value)}}/>
            </label>
            <button type="button" className="form-orange-button" onClick={handleClick}>
                Agregar
            </button>
        </form>
    );
}

export {Requirement};