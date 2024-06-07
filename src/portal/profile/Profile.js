import axios from "axios";
import Swal from "sweetalert2";
import { useContext, useState,useEffect } from "react";
import { UserContext } from "../../context/UserProvider";
import {SERVER} from "../../context/Backend";

function Profile() {
    const {user, reloadData, getToken} = useContext(UserContext);

    const [contrasena, setContrasena] = useState('');
    const [nombres, setNombre] = useState(user.nombres);
    const [apellidos, setApellido] = useState(user.apellidos);
    const [correo, setCorreo] = useState(user.correo);
    const [telefono, setTelefono] = useState(user.telefono);
    const [fecha_nacimiento, setFecha_nacimiento] = useState(new Date(user.fecha_nacimiento).toISOString().split('T')[0]);
    const [eps, setEps] = useState(String(user.eps));

    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`${SERVER}/eps/`)
        .then(({data})=>{
            setList(data)
        }).catch(()=>{})
    }, [])

    const reloadForm=()=>{
        if (user.documento) {
            const config={
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    'token-clubsue':getToken()
                }
            }
            axios.get(`${SERVER}/person/${user.documento}`, config)
            .then(({data:user})=>{
                setNombre(String(user.nombres));
                setApellido(String(user.apellidos));
                setCorreo(String(user.correo));
                setTelefono(String(user.telefono));
                setFecha_nacimiento(new Date(user.fecha_nacimiento).toISOString().split('T')[0]);
                setContrasena('')
            }).catch(()=>{})

        }
    }
    
    const handleEdit=()=>{
        if (nombres&&apellidos&&eps&&fecha_nacimiento&&correo&&telefono) {
            const config={
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    'token-clubsue':getToken()
                }
            }
            let data={documento: user.documento,nombres,apellidos,eps,fecha_nacimiento,correo,telefono};
            if (contrasena!=='') {
                data={...data, contrasena};
            } 
            axios.put(`${SERVER}/person/`,data ,config)
            .then(({data})=>{
                setTimeout(() => {
                    reloadData().then(()=>{
                        Swal.fire({
                            icon: 'success',
                            text: `${JSON.stringify(data)}`,
                            confirmButtonColor:'#fe6601'
                        })
                        reloadForm()
                    })
                }, 1000);
            }).catch((e)=>{
                Swal.fire({
                    icon: 'error',
                    text: `Ha ocurrido un error al editar`,
                    confirmButtonColor:'#fe6601'
                })
            })
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Por favor rellene los campos obligatorios',
                confirmButtonColor:'#fe6601'
            })
        }
    }

    return (
        <>
            <form className="form-normal">
                <h2 className="title">Editar Perfil</h2> 
                <p className="text-normal">Por favor relllene los campos obligatorios (<span className="red">*</span>). </p>
                <label className="field-form">
                    <p>Nombre:<span className="red">*</span></p>
                    <input type='text' placeholder="Ingrese su nombre" value={nombres} onChange={e=>{setNombre(e.target.value)}}/>
                </label>
                <label className="field-form">
                    <p>Apellido:<span className="red">*</span></p>
                    <input type='text' placeholder="Ingrese su apellido" value={apellidos} onChange={e=>{setApellido(e.target.value)}}/>
                </label>
                <label className="field-form">
                    <p>Correo:<span className="red">*</span></p>
                    <input type='email' placeholder="Ingrese su correo" value={correo} onChange={e=>{setCorreo(e.target.value)}}/>
                </label>
                <label className="field-form">
                    <p>Teléfono:<span className="red">*</span></p>
                    <input type='tel' placeholder="Ingrese un número de teléfono" value={telefono} onChange={e=>{setTelefono(e.target.value)}}/>
                </label>
                <label className="field-form">
                    <p>Fecha de Nacimiento:<span className="red">*</span></p>
                    <input type='date' placeholder="Ingrese un número de teléfono" value={fecha_nacimiento} onChange={e=>{setFecha_nacimiento(e.target.value)}}/>
                </label>
                <label className="field-form">
                    <p>EPS:<span className="red">*</span></p>
                    <select value={eps} onChange={e=>setEps(e.target.value)}>
                        {list.map(e=>(
                            <option className="option" value={`${e.id}`}>{e.nombre}</option>
                        ))}
                    </select>
                </label>
                <label className="field-form">
                    <p>Contraseña:</p>
                    <input type='password' placeholder="Ingrese un número de documento" value={contrasena} onChange={e=>{setContrasena(e.target.value)}}/>
                </label>
                <button type="button" className="form-orange-button" onClick={handleEdit}>
                    Editar
                </button>
            </form>
        </>
    );
}

export {Profile};