import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { SERVER } from '../../context/Backend';
import Swal from "sweetalert2";
import { PersonData } from "../person/PersonData";

function Students() {

    const {getToken }= useContext(UserContext);
    const [search, setSearch] = useState('');
    const [estudiantes, setEstudiantes] = useState([]);
    const [info, setInfo] = useState({});
    const [modal, setModal] = useState(false)

    
    let filter=estudiantes.filter(e=>{
        const nc=e.nombres+' '+e.apellidos;
        return String(nc).toUpperCase().includes(search.toUpperCase())
    })
    
    let array=(search==='')?estudiantes:filter;
    

    useEffect(() => {
        const config={
            headers:{
                'Access-Control-Allow-Origin': '*',
                'token-clubsue':getToken()
            }
        }
        axios.get(`${SERVER}/person/student/all`, config)
        .then(({data})=>{
            setEstudiantes(data)
        }).catch(()=>{})
    }, [])
    
    const getInfo=(id)=>{
        const config={
            headers:{
                'Access-Control-Allow-Origin': '*',
                'token-clubsue':getToken()
            }
        }
        axios.get(`${SERVER}/person/${id}`,config)
        .then(({data})=>{
            setInfo(data)
            setModal(true)
        }).catch((e)=>{
            Swal.fire({
                icon: 'error',
                text: `${e.response.data}`,
                confirmButtonColor:'#fe6601'
            });
        })
    }

    return (
        <>
            <form className="form-normal">
                <h2 className="title">Listado de estudiantes</h2> 
                <p className="text-normal">A continuación se listan los estudiantes para consultar su información</p>
                <label className="field-form">
                    <input type='text' placeholder="Ingrese el nombre del estudiante para buscar" value={search} onChange={e=>{setSearch(e.target.value)}}/>
                </label>
                {
                    array.map(e=>(
                        <div className="attendance-div">
                            <span>{e.documento} - {e.nombres} {e.apellidos}</span>
                            <button type="button" className="orange-button" onClick={()=>getInfo(e.documento)}>Ver detalles</button>
                        </div>
                    ))
                }
            </form>
            {
                
                (!!modal)&&<PersonData title={'estudiante'} data={info} close={e=>setModal(false)}/>
            }
        </>
    );
}

export {Students};