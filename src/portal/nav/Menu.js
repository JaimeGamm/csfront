import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";



function Menu({item, setItem}) {
    const {getMenu} = useContext(UserContext);

    const list=getMenu();
    return (
        <div className="portal-menu">
            {list.map(e=>(
                <div className={(item===e)?'portal-menu-item-selected':'portal-menu-item'} onClick={()=>setItem(e)}>{e}</div>
            ))}
        </div>
    );
}

export {Menu};