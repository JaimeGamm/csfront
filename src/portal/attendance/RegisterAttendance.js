import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { SERVER } from '../../context/Backend';
import Swal from "sweetalert2";

function RegisterAttendance() {

    const { user,getToken }= useContext(UserContext);
    const [search, setSearch] = useState('');
    const [students, setStudents] = useState([]);
    let filter=students.filter(e=>{
        const nc=e.nombres+' '+e.apellidos;
        return String(nc).toUpperCase().includes(search.toUpperCase())
    })
    let array=(search==='')?students:filter;
    

    useEffect(() => {
        const config={
            headers:{
                'Access-Control-Allow-Origin': '*',
                'token-clubsue':getToken()
            }
        }
        axios.get(`${SERVER}/attendance/`, config)
        .then(({data})=>{
            setStudents(data)
        }).catch(()=>{})
    }, [])
    
    const registerAttendance=(id)=>{
        const config={
            headers:{
                'Access-Control-Allow-Origin': '*',
                'token-clubsue':getToken()
            }
        }
        axios.post(`${SERVER}/attendance/`, {instructor: user.documento, alumno:id},config)
        .then(({data})=>{
            setStudents(data)
            Swal.fire({
                icon: 'success',
                text: `Asistencia registrada`,
                confirmButtonColor:'#fe6601'
            });
        }).catch(()=>{
            Swal.fire({
                icon: 'error',
                text: `No se ha podido registrar la asistencia`,
                confirmButtonColor:'#fe6601'
            });
        })
    }

    return (
        <>
            <form className="form-normal">
                <h2 className="title">Registrar asistencia</h2> 
                <p className="text-normal">A continuación se listan los estudiantes para registrar su asistencia</p>
                <label className="field-form">
                    <input type='text' placeholder="Ingrese nombre de estudiante para buscar" value={search} onChange={e=>{setSearch(e.target.value)}}/>
                </label>
                {
                    array.map(e=>(
                        <div className="attendance-div">
                            <span>{e.documento} - {e.nombres} {e.apellidos}</span>
                            <button type="button" className="orange-button" onClick={()=>registerAttendance(e.documento)}>Registrar</button>
                        </div>
                    ))
                }
            </form>
        </>
    );
}

export {RegisterAttendance};