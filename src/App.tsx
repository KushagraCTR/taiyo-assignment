
import Contact from "./Containers/Contact";
import Dummy from "./Containers/Dummy";
import Chart from "./Containers/Chart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/global.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <SideMenu showSideBar={showSideBar} toggleSideBar={toggleSideBar} /> */}
        <Route path="/" element={<Contact />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/map" element={<Chart />} />
        <Route path="/dummy" element={<Dummy />} />
        {/* <Route path="/chart" element={<ContactForm feature={"kk"} toUpdateContact={{}} />} /> */}
      </Routes>

      {/* <div>
        <ContactList />
      </div> */}
    </BrowserRouter>
  );
}

export default App;
