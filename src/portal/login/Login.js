import axios from "axios";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserProvider";
import { ViewContext } from "../../context/ViewProvider";
import { SERVER } from '../../context/Backend';

function Login(props) {
    const [documento, setDocumento] = useState('');
    const [contrasena, setContrasena] = useState('');

    const {setView} = useContext(ViewContext);
    const {setUser, setToken}= useContext(UserContext);

    const handleLogin=()=>{
        if (documento&&contrasena) {
            const config={
                headers:{
                    'Access-Control-Allow-Origin': '*',
                }
            }
            axios.post(`${SERVER}/person/login`, {documento,contrasena},config)
            .then(({data})=>{
                setView('');
                setUser(data);
                setToken(data.token)
            })
            .catch((e)=>{
                Swal.fire({
                    icon: 'error',
                    text: `${e.response.data}`,
                    confirmButtonColor:'#fe6601'
                })
            })
        }else{
            Swal.fire({
                icon: 'error',
                text: 'Por favor rellene los campos obligatorios',
                confirmButtonColor:'#fe6601'
            })
        }
    };

    return (
        <form >
            <h2 className="title">Inicio de Sesión</h2>
            <p className="text-normal">Por favor relllene los campos obligatorios (<span className="red">*</span>). </p>
            <label className="field-form">
                <p>Documento<span className="red">*</span>:</p>
                <input type='text' placeholder="Ingrese un número de documento" value={documento} onChange={e=>{setDocumento(e.target.value)}}/>
            </label>
            <label className="field-form">
                <p>Contraseña<span className="red">*</span>:</p>
                <input type='password' placeholder="Ingrese un número de documento" value={contrasena} onChange={e=>{setContrasena(e.target.value)}}/>
            </label>
            <button type="button" className="form-dark-button" onClick={()=>{setView('SINGUP')}}>
                Crear cuenta
            </button>
            <button type="button" className="form-orange-button" onClick={handleLogin}>
                Iniciar sesión
            </button>
        </form>
    );
}

export {Login};