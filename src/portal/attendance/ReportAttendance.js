import axios from "axios";
import { useState, useContext } from "react";
import { SERVER } from '../../context/Backend';
import { UserContext } from "../../context/UserProvider";
import Swal from "sweetalert2";
import DataTable from 'react-data-table-component';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Checkbox from '@mui/material/Checkbox';


const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

function ReportAttendance() {
    const { user,getToken }= useContext(UserContext);

    const [menor, setMenor] = useState('')
    const [mayor, setMayor] = useState('')
    const [consult, setConsult] = useState(false)
    const [data, setData] = useState([])

    const handleSearch=()=>{
        if (menor&&mayor) {
            let diff=new Date(mayor)-new Date(menor)
            if (diff>=0) {
                const config={
                    headers:{
                        'Access-Control-Allow-Origin': '*',
                        'token-clubsue':getToken()
                    }
                }
                axios.get(`${SERVER}/attendance/report/${menor}/${mayor}`,config)
                .then(({data})=>{
                    setConsult(true)
                    setData(data)
                }).catch((e)=>{
                    Swal.fire({
                        icon: 'error',
                        text: `${e.response.data}`,
                        confirmButtonColor:'#fe6601'
                    });
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'Por favor seleccione una fecha de incio que sea menor a la fecha final',
                    confirmButtonColor:'#fe6601'
                })
            }
            
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Por favor rellene los campos obligatorios',
                confirmButtonColor:'#fe6601'
            })
        }
    }

    const columns=[
        {
            name: 'Estudiante',
            sortable:true,
            selector: row => row.estudiante,
        },
        {
            name: 'Asistencias',
            sortable:true,
            selector: row => row.asistencias,
        },
    ]

    const clean=()=>{
        setMenor('')
        setMayor('')
        setData([])
        setConsult(false)
    }

    return (
        <form className="form-normal">
            <h2 className="title">Reporte de asistencias</h2> 
            <p className="text-normal">Por favor relllene los campos obligatorios (<span className="red">*</span>). </p>
            <label className="field-form">
                <p>Fecha de inicio:<span className="red">*</span></p>
                <input type='date' value={menor} onChange={e=>{setMenor(e.target.value)}}/>
            </label>
            <label className="field-form">
                <p>Fecha final:<span className="red">*</span></p>
                <input type='date' value={mayor} onChange={e=>{setMayor(e.target.value)}}/>
            </label>
            { !!consult&&
                <button type="button" className="form-black-button" onClick={clean}>
                    Limpiar
                </button>
            }
            <button type="button" className="form-orange-button" onClick={handleSearch}>
                Consultar
            </button>
            {(!!consult&&data.length===0)&&<p className="text-normal">No hay un reporte de asistencias para este periodo de tiempo 😥</p>}
            {(!!consult&&data.length>0)&&
                <DataTable 
                    data={data}
                    columns={columns}
                    pagination
                    selectableRowsComponent={Checkbox}
                    selectableRowsComponentProps={selectProps}
                    sortIcon={sortIcon}
                    defaultSortAsc={false}
                    defaultSortFieldId="estudiante"
                />
            }
        </form>
    );
}

export {ReportAttendance};