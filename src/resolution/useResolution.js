import {useState} from "react";



function useResolution() {
    handleResize();
    
    const [width, setWidth] = useState(window.innerWidth);
    
    function handleResize() {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    };
    
    
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    
    return typeResolution(width);
}

function typeResolution(width) {
    if (width<768) {
        return 'MOBILE';
    }else{
        return 'DESKTOP';
    }
}

export {useResolution}