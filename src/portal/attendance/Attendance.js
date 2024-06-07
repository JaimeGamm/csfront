import { useState, useEffect,useContext } from 'react';
import Calendar from 'rc-year-calendar';
import { UserContext } from "../../context/UserProvider";
import { SERVER } from '../../context/Backend';
import 'rc-year-calendar/locales/rc-year-calendar.es';
import axios from 'axios';

function Attendance() {
    const { user,getToken }= useContext(UserContext);
    const [days, setDays] = useState([])

    const data=days.map(d=> {return {startDate:new Date(d), endDate:new Date(d), color:'#fe6601'}})
    useEffect(() => {
        const config={
            headers:{
                'Access-Control-Allow-Origin': '*',
                'token-clubsue':getToken()
            }
        }
        axios.get(`${SERVER}/attendance/${user.documento}`, config)
        .then(({data})=>{
            let a=data.map(e=> e.fecha_asistencia)
            setDays(a)
        }).catch(()=>{})
    }, [])
    
    return (
        <>
            <Calendar
                currentYear={new Date().getFullYear()}
                minDate={null}
                maxDate= {null}
                language= {'es'}
                style='background'
                allowOverlap= {true}
                enableRangeSelection= {false}
                displayWeekNumber= {false}
                roundRangeLimits={false}
                alwaysHalfDay={false}
                dataSource={data}
            />
        </>
    );
}

export {Attendance};