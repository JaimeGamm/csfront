import { useContext, useState } from 'react';
import { ViewContext } from '../context/ViewProvider';
import { UserContext } from '../context/UserProvider';
import { useResolution } from '../resolution/useResolution';

import {Login} from './login/Login';
import {Singup} from './signup/Singup';
import {NavPortal} from './nav/NavPortal';
import {Menu} from './nav/Menu';
import { Profile } from './profile/Profile';
import { Tracking } from './tracking/Tracking';
import { Attendance } from './attendance/Attendance';
import { Logout } from './Logout/Logout';
import { Report } from './report/Reports';
import { RegisterAttendance } from './attendance/RegisterAttendance';
import { AddReport } from './report/AddReport';
import { Evaluation } from './evaluation/Evaluation';
import { Principal } from './principal/Principal';
import { Role } from './role/Role';
import { Requirement } from './requirement/requirement';
import { Students } from './students/Students';
import { Instructors } from './instructors/Instructors';
import { ReportAttendance } from './attendance/ReportAttendance';

function Portal() {
    const {view} = useContext(ViewContext);
    const {validateUser} = useContext(UserContext);
    const [menuItem, setMenuItem] = useState('');

    const resolution=useResolution();

    return ( 
        <>
            <NavPortal item={menuItem} setItem={m=>setMenuItem(m)}/>
            
            <div className='portal'>
                {view==='LOGIN'&&<Login/>}
                {view==='SINGUP'&&<Singup/>}
                {
                validateUser&&
                <div className='portal-container'>
                    {resolution!=='MOBILE'&&<Menu item={menuItem} setItem={m=>setMenuItem(m)} />}
                    <div className='portal-select'>
                        {menuItem===''&&<Principal/>}
                        {menuItem==='Perfil'&&<Profile/>}
                        {menuItem==='Mi desarrollo'&&<Tracking/>}
                        {menuItem==='Asistencia'&&<Attendance/>}
                        {menuItem==='Cerrar sesión'&&<Logout menuItem={e=>setMenuItem(e)}/>}
                        {menuItem==='Mis reportes'&&<Report/>}
                        {menuItem==='Registrar asistencia'&&<RegisterAttendance/>}
                        {menuItem==='Agregar informe'&&<AddReport/>}
                        {menuItem==='Evaluar alumnos'&&<Evaluation/>}
                        {menuItem==='Agregar instructor/administrador'&&<Role/>}
                        {menuItem==='Agregar requisito'&&<Requirement/>}
                        {menuItem==='Listado de estudiantes'&&<Students/>}
                        {menuItem==='Listado de instructores'&&<Instructors/>}
                        {menuItem==='Reporte de asistencias'&&<ReportAttendance/>}
                    </div>
                </div>
                }
            </div>
            
        </>
    );
}

export {Portal};