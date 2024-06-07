import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ComponentCard({title, array}) {
    let total=array.length;
    let percentage=(total!==0)?(array.length===0)?100:(array.reduce((sum,item)=> (item?.estado===1)?(sum+1):(sum+0),0)*100)/total:(array.length===0)?100:0;
    
    return (
        <div className="progress-card">
                    <h2>{title}</h2>
                    <div>
                        <CircularProgressbar 
                            value={percentage}
                            text={`${percentage}%`}
                            strokeWidth={5}
                            styles={buildStyles({
                                strokeLinecap: "butt",
                                pathColor: "#fe6601",
                                textColor: "black",
                            })}
                        />
                    </div>
                    {array.map(e=>{
                        if (e.estado===1) {
                            return <p className="text-normal">{e.requisito}  <img className="img-req" alt='Icono de requisito realizado' src="https://i.ibb.co/fQCvBCG/comprobado.png"/></p>
                        } else {
                            return <p className="text-normal">{e.requisito}  <img className="img-req" alt='Icono de requisito no realizado' src="https://i.ibb.co/FYHGS4k/cancelar.png"/></p>
                        }
                    })}
                    
                </div>
    );
}

export {ComponentCard};