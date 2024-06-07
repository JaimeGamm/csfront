import { createContext, useState } from "react";

const ViewContext=createContext();

function ViewProvider({children}) {
    
    const [view, setView] = useState('HOMEPAGE');
    return(
        <ViewContext.Provider
            value={{
                view,
                setView
            }}
        >
            {children}
        </ViewContext.Provider>
    );
}

export {ViewProvider, ViewContext};