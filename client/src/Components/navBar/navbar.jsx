import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import style from "./navbar.module.css";
import { getCountriesByName, getCountries, filterCountries} from "../../redux/action/actions";

export default function Navbar({Navigate, setCurrentPage}){

    const dispatch = useDispatch();
    const countries = useSelector(state=> state.allCountries)
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState({});
    const touristActivitiesNames = countries.flatMap(({ tourist_activities }) => 
    tourist_activities.map(({ name }) => name, )
   );
   
       

    const searchHandler = (e) => {
        dispatch(getCountriesByName(inputValue));
      };

      const onChanceInput = (e) => {
        console.log(e.target.value)
        setInputValue(e.target.value);
      };

      const handleFilter = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
      };

      const submitFilter = (e) => {
        dispatch(filterCountries(filter)); // el filter es el array de filtros
        setCurrentPage(1);
      };


      useEffect(() => {
        if (!getCountries.length) {
          dispatch(getCountries());
         }
      }, [getCountries, dispatch]);

    

    return(
        <div className={style.container}>
            <div className={style.selectContainer}>
             <select onChange={handleFilter} name="continent">
                <option value="">Continent</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Americas">America</option>
                <option value="Polar">Polar</option>
                <option value="Antarctic Ocean">Antarctic Ocean</option>
            </select>
            <select onChange={handleFilter} name="population">
                <option value="">Population</option>
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
            </select>
            <select onChange={handleFilter} name="tourist_activities">
              <option value="">Tourist Activities</option>
              {
                [...new Set(touristActivitiesNames)].map((name, i) => (
                  <option key={i} value={name}>
                    {name}
                  </option>
                ))
              }
            </select>
            <select onChange={handleFilter} name="alpha">
                <option value="">ORDER</option>
                <option value="DESC">A-Z</option>
                <option value="ASC">Z-A</option>
            </select>
            <button onClick={submitFilter}  className={style.buttonNav}>Filter</button>

            <input onChange={onChanceInput} type="text" placeholder="Country Name" />
            <button onClick={searchHandler} className={style.buttonNav}>Search</button>
            <button onClick={() => Navigate("/activities/create")} className={style.buttonNav}>Create activities</button>




          </div>
        </div>
    )


}

//
// <select name="TouristActivity" onChange={handleFilter}>
//     <option value="TouristActivity"></option>
//      {touristActivity.mpa((activity,i)=>{
//         return (
//             <option key={i} value={activity.name}>
//             {activity}
//         </option>
//         )
//      })}
// </select>
