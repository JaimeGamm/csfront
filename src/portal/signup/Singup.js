import axios from "axios";
import { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserProvider";
import { ViewContext } from "../../context/ViewProvider";
import { SERVER } from "../../context/Backend";

function Singup(props) {
    const [documento, setDocumento] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [nombres, setNombre] = useState('');
    const [apellidos, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fecha_nacimiento, setFecha_nacimiento] = useState('');
    const [eps, setEps] = useState('-1');

    const [list, setList] = useState([]);

    const {setView} = useContext(ViewContext);
    const {setUser}= useContext(UserContext);

    useEffect(() => {
        
        axios.get(`${SERVER}/eps/`)
        .then(({data})=>{
            setList(data)
        })
        .catch(()=>{});
    }, [])
    

    const handleSingup=()=>{
        if (documento&&contrasena&&nombres&&apellidos&&correo&&telefono&&fecha_nacimiento&&eps!=='-1') {
            axios.post(`${SERVER}/person/student`,{documento,eps,nombres,apellidos,telefono,fecha_nacimiento,correo,contrasena})
            .then(({data})=>{
                setView('');
                setUser(data);
            }).catch((e)=>{
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
            <h2 className="title">Registrate</h2>
            <p className="text-normal">Por favor relllene los campos obligatorios (<span className="red">*</span>). </p>
            <label className="field-form">
                <p>Documento<span className="red">*</span>:</p>
                <input type='text' placeholder="Ingrese un número de documento" value={documento} onChange={e=>{setDocumento(e.target.value)}}/>
            </label>
            <label className="field-form">
                <p>Nombre:<span className="red">*</span>:</p>
                <input type='text' placeholder="Ingrese su nombre" value={nombres} onChange={e=>{setNombre(e.target.value)}}/>
            </label>
            <label className="field-form">
                <p>Apellido:<span className="red">*</span>:</p>
                <input type='text' placeholder="Ingrese su apellido" value={apellidos} onChange={e=>{setApellido(e.target.value)}}/>
            </label>
            <label className="field-form">
                <p>Correo:<span className="red">*</span>:</p>
                <input type='email' placeholder="Ingrese su correo" value={correo} onChange={e=>{setCorreo(e.target.value)}}/>
            </label>
            <label className="field-form">
                <p>Teléfono:<span className="red">*</span>:</p>
                <input type='tel' placeholder="Ingrese un número de teléfono" value={telefono} onChange={e=>{setTelefono(e.target.value)}}/>
            </label>
            <label className="field-form">
                <p>Fecha de Nacimiento:<span className="red">*</span>:</p>
                <input type='date' placeholder="Ingrese un número de teléfono" value={fecha_nacimiento} onChange={e=>{setFecha_nacimiento(e.target.value)}}/>
            </label>
            <label className="field-form">
                <p>EPS:<span className="red">*</span>:</p>
                <select value={eps} onChange={e=>setEps(e.target.value)}>
                    <option className="option" value='-1'>SELECCIONE UNA EPS</option>
                    {list.map(e=>(
                        <option className="option" value={`${e.id}`}>{e.nombre}</option>
                    ))}
                </select>
            </label>
            <label className="field-form">
                <p>Contraseña<span className="red">*</span>:</p>
                <input type='password' placeholder="Ingrese un número de documento" value={contrasena} onChange={e=>{setContrasena(e.target.value)}}/>
            </label>
            <button type="button" className="form-dark-button" onClick={()=>{setView('LOGIN')}}>
                Iniciar sesión
            </button>
            <button type="button" className="form-orange-button" onClick={handleSingup}>
                Registrarse
            </button>
        </form>
    );
}

export  {Singup};