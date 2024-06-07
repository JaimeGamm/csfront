import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserProvider";
import { SERVER } from '../../context/Backend';

function Role() {
    const [documento, setDocumento] = useState('')
    const [role, setRole] = useState('instructor')
    const {getToken} = useContext(UserContext)
    
    const handleClick=()=>{
        if (role!==''&&documento!=='') {
            const config={
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    'token-clubsue':getToken()
                }
            }
            axios.post(`${SERVER}/person/${role}`,{documento},config)
            .then(({data})=>{
                setDocumento('')
                setRole('')
                Swal.fire({
                    icon: 'success',
                    text: `Se ha asignado el rol perfectamente`,
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
                text: `Por favor ingrese un documento y seleccione un rol`,
                confirmButtonColor:'#fe6601'
            })
        }
    }
    return (
        <>
            <h2 className="title">Asignar rol</h2>
            <br/>
            <p className="text-normal">Por favor relllene los campos obligatorios (<span className="red">*</span>). </p>
            <br/>
            <label className="field-form">
                <p>Documento<span className="red">*</span>:</p>
                <input type='text' placeholder="Ingrese un número de documento" value={documento} onChange={e=>{setDocumento(e.target.value)}}/>
            </label>
            <br/>
            <br/>
            <label className="field-form">
                <p>Rol:<span className="red">*</span>:</p>
                <select value={role} onChange={e=>setRole(e.target.value)}>
                    <option className="option" value='instructor'>Instructor</option>
                    <option className="option" value='admin'>Administrador</option>
                </select>
            </label>
            <br/>
            <br/>
            <button type="button" className="form-orange-button" onClick={handleClick}>
                Asignar
            </button>
        </>
    );
}

export {Role};