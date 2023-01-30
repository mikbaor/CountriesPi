import React from "react";
import { Route, Routes } from "react-router-dom";
import Landingpage from "./Components/landingPage/landingpage"
import Home from "./Components/home/home";
import Navbar from "./Components/navBar/navbar";
import Details from "./Components/details/details";
import CreateTouristActivity from "./Components/form/form";

//import CreateTouristActivity from "./CreateTouristActivity/CreateTouristActivity";   <Route path="/create-activity" component={CreateTouristActivity} />

const App = () => {

return (
    <Routes>
        
       <Route exact path="/" element={<Landingpage/>} />
       <Route path="/home" element={<Home/>}/>
       <Route exact path="/country/:id" element={<Details />} />
       <Route exact path="/activities/create" element={<CreateTouristActivity/>} />
        

  </Routes>
);
};

export default App;


//  breed = touristActivity
