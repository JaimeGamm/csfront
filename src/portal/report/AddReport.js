import axios from "axios";
import { useState,useContext,useEffect } from "react";
import { UserContext } from "../../context/UserProvider";
import { SERVER } from '../../context/Backend';
import Swal from "sweetalert2";

function AddReport() {
    const { user,getToken }= useContext(UserContext);
    const [search, setSearch] = useState(false);
    const [requirements, setRequirements] = useState([])

    const [student, setStudent] = useState('');
    const [requirement, setRequirement] = useState('-1')
    const [description, setDescription] = useState('');

    const [belt, setBelt] = useState(-1);
    const [nameBelt, setNameBelt] = useState('');

    useEffect(() => {
        if (belt!==-1) {
            const config={
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    'token-clubsue':getToken()
                }
            }
            axios.get(`${SERVER}/belt/belt/${belt}`, config)
            .then(({data})=>{setNameBelt(data.nombre)})
            .catch((e)=>{})
        }
    }, [belt])

    const handleSearch=()=>{
        const config={
            headers:{
                'Access-Control-Allow-Origin': '*',
                'token-clubsue':getToken()
            }
        }
        axios.get(`${SERVER}/rank/${student}`,config)
        .then(({data})=>{
            if (data.length>0) {
                setRequirements(data)
                setBelt(data[0].cinta)
                setSearch(true)
            }else{
                Swal.fire({
                    icon: 'error',
                    text: `El usuario no posee un rango`,
                    confirmButtonColor:'#fe6601'
                });
            }
        })
    }

    const handleCancel=()=>{
        setSearch(false)
    }

    const handleAdd=()=>{
        if (requirement==='-1') {
            Swal.fire({
                icon: 'error',
                text: `Por favor seleccione un requisito`,
                confirmButtonColor:'#fe6601'
            })
        } else {
            const config={
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    'token-clubsue':getToken()
                }
            }
            axios.post(`${SERVER}/report/add`,{documento:student,descripcion:description,instructor:user.documento,requisito:requirement},config)
            .then(({data})=>{
                setRequirements(data)
                setRequirement('-1');
                setDescription('');
                Swal.fire({
                    icon: 'success',
                    text: `El informe se ha añadido correctamente`,
                    confirmButtonColor:'#fe6601'
                })
            }).catch(e=>{
                Swal.fire({
                    icon: 'error',
                    text: `${e.response.data}`,
                    confirmButtonColor:'#fe6601'
                })
            })
        }
    }
    return (
        <>
            <form className="form-normal">
                <h2 className="title">Agregar informe</h2> 
                <p className="text-normal">Por favor rellene los campos obligatorios (<span className="red">*</span>). </p>
                <label className="field-form">
                    <p>Documento del estudiante:<span className="red">*</span></p>
                    <input type='text' disabled={search} placeholder="Ingrese el número de documento del estudiante" value={student} onChange={e=>{setStudent(e.target.value)}}/>
                </label>
                {!search&&<button type="button" className="form-orange-button" onClick={handleSearch}>
                    Buscar
                </button>}
                {!!search&&
                    <>
                        <button type="button" className="form-dark-button" onClick={handleCancel}>
                            Cancelar
                        </button>
                        <center>
                            <p className="text-bold">Cinta: <span className="text-normal">{nameBelt}</span></p>
                        </center>
                        <label className="field-form">
                            <p>Requisito:<span className="red">*</span>:</p>
                            <select value={requirement} onChange={e=>setRequirement(e.target.value)}>
                                <option className="option" value='-1'>SELECCIONE UN REQUISITO</option>
                                {requirements.map(e=>(
                                    <option className="option" value={`${e.requisito_id}`}>({e.componente}) {e.requisito}</option>
                                ))}
                            </select>
                        </label>
                        <label className="field-form">
                            <p>Descripción:</p>
                            <textarea placeholder="Ingrese una descripción" value={description} onChange={e=>{setDescription(e.target.value)}}/>
                        </label>
                        <button type="button" className="form-orange-button" onClick={handleAdd}>
                            Agregar informe
                        </button>
                    </>
                }
            </form>
        </>
    );
}

export {AddReport};