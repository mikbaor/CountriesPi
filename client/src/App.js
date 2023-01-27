import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import Landingpage from "./Components/landingPage/landingpage"
import {detailsCountries} from "./redux/action/actions";
import Home from "./Components/home/home";
import axios from "axios";
//import CreateTouristActivity from "./CreateTouristActivity/CreateTouristActivity";   <Route path="/create-activity" component={CreateTouristActivity} />

const App = () => {
    const[characters, setCharacters] = useState([])
    
    const onSearch = ()=>{
        function onSearch(character)
            axios(`https://rickandmortyapi.com/api/character/${character}`)
            .then((Response)=>Response.json())
            .then((data)=>{
                if (data.name) {
                    setCharacters((oldChars)=> [oldChars,data])
                }   else {
                    window.alert("No hay personajes con ese ID")
                }
            })
        
    }

    const onClose = (id)=> {
        setCharacters(characters.filter(characters => characters.id !== id))
    }

return (
  <div>
    <NavBar onSearch = {onSearch}/>
    <Cards characters = {characters} onClose={onClose}/>
  </div>
);
};

export default App;


//  breed = touristActivity
