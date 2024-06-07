import axios from "axios";
import { useState,useContext, useEffect } from "react";
import { UserContext } from "../../context/UserProvider";
import Swal from "sweetalert2";
import { SERVER } from '../../context/Backend';

function Evaluation() {

    const { user,getToken }= useContext(UserContext);
    const [search, setSearch] = useState(false);
    const [requirements, setRequirements] = useState([])

    const [student, setStudent] = useState('');
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
    

    const handleChange=(id)=>{
        let i=requirements.findIndex(e=>e.requisito_id===id);
        if(i>=0){
            let temp=[...requirements];
            temp[i].state=!temp[i].state;
            setRequirements(temp);
        }
    }
    const handleSearch=()=>{
        if (student) {
            const config={
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    'token-clubsue':getToken()
                }
            }
            axios.get(`${SERVER}/rank/${student}`,config)
            .then(({data})=>{
                setRequirements(data)
                setBelt(data[0].cinta)
                setSearch(true)
            }).catch((error)=>{
                Swal.fire({
                    icon: 'error',
                    text: `No se encuentra registrado el estudiante`,
                    confirmButtonColor:'#fe6601'
                });
            })
        } else {
            Swal.fire({
                icon: 'error',
                text: `Por favor ingrese un documento`,
                confirmButtonColor:'#fe6601'
            });
        }
    }
    const initializate=()=>{
        const config={
            headers:{
                'Access-Control-Allow-Origin': '*',
                'token-clubsue':getToken()
            }
        }
        axios.post(`${SERVER}/rank/initializate`, {documento:student} ,config)
        .then(({data})=>{
            let temp=data.map(e=>{return {...e, state:false}})
            setBelt(data[0].cinta)
            setRequirements(temp)
        }).catch((e)=>{
            Swal.fire({
                icon: 'error',
                text: `${e.response.data}`,
                confirmButtonColor:'#fe6601'
            })
        })
    }

    const handleCancel=()=>{
        setSearch(false)
    }

    const handleAdd=()=>{
        const config={
            headers:{
                'Access-Control-Allow-Origin': '*',
                'token-clubsue':getToken()
            }
        }
        let data={instructor:user.documento,requisitos:requirements.filter(e=>e.state===true)}
        if (data.requisitos.length>0) {
            axios.post(`${SERVER}/report/evaluate`, data ,config)
            .then(({data})=>{
                let temp=data.map(e=>{return {...e, state:false}})
                setBelt(data[0].cinta)
                setRequirements(temp)
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
                text: `Para enviar una evaluación se necesita marcar por lo menos 1 requisito`,
                confirmButtonColor:'#fe6601'
            })
        }
    }

    return (
        <>
            <form className="form-normal">
                <h2 className="title">Evaluar estudiante</h2> 
                <p className="text-normal">Por favor rellene los campos obligatorios (<span className="red">*</span>). </p>
                <label className="field-form">
                    <p>Documento del estudiante:<span className="red">*</span></p>
                    <input type='text' disabled={search} placeholder="Ingrese el número de documento del estudiante" value={student} onChange={e=>{setStudent(e.target.value)}}/>
                </label>
                {!search&&<button type="button" className="form-orange-button" onClick={handleSearch}>
                    Buscar
                </button>}
                {((!!search)&&(requirements.length===0))&&
                    <div>
                        <p className="text-normal">El estudiante no posee rango, ¿Desea crearle uno?</p>
                        <button type="button" className="form-orange-button" onClick={()=>{initializate()}}>Comezar</button>
                    </div>
                }
                {(!!search&&(requirements.length>0))&&
                    <>
                        <button type="button" className="form-dark-button" onClick={handleCancel}>
                            Cancelar
                        </button>
                        <center>
                            <p className="text-bold">Cinta: <span className="text-normal">{nameBelt}</span></p>
                        </center>
                        
                        {
                            requirements.map((e)=>(
                                <div className="eval-req">
                                    <p className={`text normal ${(e.state)?'line':''}`}>({e.componente}) {e.requisito}: {e.poomse}</p>
                                    <input type='checkbox' value={e.state} checked={e.state} onChange={()=>handleChange(e.requisito_id)}/>
                                </div>
                            ))
                        }
                        <button type="button" className="form-orange-button" onClick={handleAdd}>
                            Evaluar
                        </button>
                    </>
                }
            </form>
        </>
    );
}

export {Evaluation};