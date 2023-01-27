// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import style from "./navbar.module.css";
// import { getCountriesByName, getTouristActivity, filterCountries,
//   } from "../../redux/action/actions";
  

//   export default function Navbar (navigate, setCurrentPageNumber){

//     const dispatch = useDispatch()
//     const touristActivity = useSelector(state=>{state.filterCountries})
//     const [inputValue, setInputValue] = useState("");
//     const [filter, setFilter] = useState({});

//     const searchHandler = (e) => {
//         dispatch(getCountriesByName(inputValue));
//       };


//       useEffect(() => {
//         if (!touristActivity.length) {
//           dispatch(getTouristActivity());
//         }
//       }, [touristActivity, dispatch]);


//   const onChanceInput = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleFilter = (e) => {
//     setFilter({ ...filter, [e.target.name]: e.target.value });
//   };

//   const submitFilter = (e) => {
//     dispatch(filterCountries(filter));
//     setCurrentPageNumber(1);
//   };

//   return (
//     <div className={style.container}>
//       <div className={style.selectContainer}>
//         <select name="touristActivity" onChange={handleFilter}>
//           <option value="">touristActivity</option>
//           {touristActivity.map((touristActivities, i) => {
//             return (
//               <option key={i} value={touristActivities.name}>
//                 {touristActivities.name}
//               </option>
//             );
//           })}
//         </select>
//         <select onChange={handleFilter} name="breeds">
//           <option value="">Countries</option>
//           <option value="Real Breeds">Real Breeds</option>
//           <option value="Custom Breeds">Custom Breeds</option>
//         </select>

//         <select onChange={handleFilter} name="weigth">
//           <option value="">Weigth</option>
//           <option value="Weigth ASC">ASC</option>
//           <option value="Weigth DESC">DESC</option>
//         </select>

//         <select onChange={handleFilter} name="alpha">
//           <option value="">ORDER</option>
//           <option value="DESC">A-Z</option>
//           <option value="ASC">Z-A</option>
//         </select>

//         <button onClick={submitFilter}>Filter</button>
//         <input onChange={onChanceInput} type="text" placeholder="Dog Name" />
//         <button onClick={searchHandler}>Search</button>

//         <button onClick={() => navigate("/touristActivity/create")}>Create Breed</button>
//       </div>
//     </div>
//   );
// }