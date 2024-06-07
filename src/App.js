
import { useContext } from "react";
import { ViewContext } from "./context/ViewProvider";
import { Footer } from "./footer/Footer";
import { Homepage } from "./homepage/Homepage";
import { Portal} from "./portal/Portal";

function App() {
  const {view} = useContext(ViewContext);
  return (
    <div className="App">
        {view==='HOMEPAGE'&&<Homepage/>}
        {view!=='HOMEPAGE'&&<Portal/>}
        <Footer/>
    </div>
  );
}

export default App;
