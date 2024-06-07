import { useEffect,useState } from "react";
import { SERVER } from '../../context/Backend';
import axios from "axios";

function PersonData({title, data,close}) {

    const [list, setList] = useState([])

    let eps=()=>{
        let i=list.findIndex(e=>e.id=data.eps)
        if (i>=0) {
            return list[i].nombre
        }else{
            return '';
        }
    }
    useEffect(() => {
        axios.get(`${SERVER}/eps/`)
        .then(({data})=>{
            setList(data)
        }).catch(()=>{})
    }, [])
    
    return (
        <div className="modal">
            <form className="form-normal">
                <center><h2 className="title">Datos del {title}</h2> </center> 
                <label className="field-form">
                    <p>Documento:</p>
                    <p className="text-normal">{data.documento  }</p>
                </label>
                <label className="field-form">
                    <p>Nombre:</p>
                    <p className="text-normal">{data.nombres}</p>
                </label>
                <label className="field-form">
                    <p>Apellido:</p>
                    <p className="text-normal">{data.apellidos}</p>
                </label>
                <label className="field-form">
                    <p>Correo:</p>
                    <p className="text-normal">{data.correo}</p>
                </label>
                <label className="field-form">
                    <p>Teléfono:</p>
                    <p className="text-normal">{data.telefono}</p>
                </label>
                <label className="field-form">
                    <p>Fecha de Nacimiento:</p>
                    <p className="text-normal">{String(data.fecha_nacimiento).split('T')[0]}</p>
                </label>
                <label className="field-form">
                    <p>EPS:</p>
                    <p className="text-normal">{eps()}</p>
                </label>
                <button type="button" className="form-orange-button" onClick={close}>
                    Cerrar
                </button>
            </form>
        </div>
    );
}

export {PersonData};