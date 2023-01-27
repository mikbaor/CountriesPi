// import React from "react";
// import style from "./home.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { useState } from "react"
// import { useNavigate } from "react-router-dom";
// import { filter } from "../../redux/reducer/filterCountries";
// import { filterCountries } from "../../redux/action/actions";
// import Country404 from "../404/404";
// import Load from "../loading/load";
// import Navbar from "./navbar";


// const PAGINATE = 8;

// export default function Home  (){
//     const dispatch = useDispatch();
//     const countries = useSelector((state)=>{state.allCountries})
//     const errors = useSelector((state)=>{state.errors})
//     const filterCountries = useSelector((state)=>{state.filterCountries})


//     const [currentCountries, setCurrentCountries] = useState([])
//     const [currentPageNumber, setCurrentPageNumber] = useState([])
    
//     const navigate = useNavigate()

//     const maxPages = Math.ceil(filterCountries.length/8)

//     let pagButtons = [];

//     const changePageButtonHandler = (e) => {
//         if (currentPageNumber !== parseInt(e.target.name)) {
//             setCurrentCountries([]);
//           setCurrentPageNumber(parseInt(e.target.name));
//         }
//       };
    
//       for (let i = 1; i <= maxPages; i++) {
//         pagButtons.push(
//           <button
//             key={i}
//             className={
//               currentPageNumber + "" === i + ""
//                 ? style.currentPage
//                 : style.otherPage
//             }
//             name={i}
//             onClick={changePageButtonHandler}
//           >
//             {i}
//           </button>
//         );
//       }



// useEffect(() => {
//     filterCountries.length && setCurrentCountries(filterCountries);
//   }, [filterCountries]);

//   useEffect(() => {
//     if (!countries.length) {
//       dispatch(getCountries());
//     } else {
//       setCurrentCountries(countries.slice(0, PAGINATE));
//     }
//   }, [dispatch, countries]);

//   useEffect(() => {
//     dispatch(clearDetailCountries());
//   }, [dispatch]);

//   useEffect(() => {
//     const maxRange = PAGINATE * currentPageNumber;
//     const minRange = maxRange - PAGINATE;

//     setCurrentCountries(
//       filterCountries.slice(
//         minRange,
//         maxRange >= filterCountries.length ? filterCountries.length : maxRange
//       )
//     );
//   }, [currentPageNumber, filterCountries]);

//   const nextPage = (e) => {
//     if (maxPages >= currentPageNumber + 1) {
//       setCurrentCountries([]);
//       setCurrentPageNumber(currentPageNumber + 1);
//     }
//   };

//   const previous = (e) => {
//     if (!(currentPageNumber - 1 < 1)) {
//       setCurrentCountries([]);
//       setCurrentPageNumber(currentPageNumber - 1);
//     }



//     return (
//         <div className={style.container}>
//           <Navbar setCurrentPageNumber={setCurrentPageNumber} navigate={navigate} />
//           {currentCountries.length ? (
//             <div className={style.pagination}>
//               <button onClick={previous}>Previous</button>
//               {pagButtons.map((pagbutton) => pagbutton)}
    
//               <button onClick={nextPage}>NEXT</button>
//             </div>
//           ) : (
//             ""
//           )}
//           <div className={style.dogsContainer}>
//             {errors ? (
//               <Country404 />
//             ) : currentCountries.length ? (
//               currentCountries.map((country, i) => {
//                 return (
//                   <div
//                     key={i}
//                     className={style.dogBox}
//                     onClick={() => navigate(`/countries/${country.id}`)}
//                   >
//                     <h3>{country.name}</h3>
//                     <img src={country.image} alt="" />
//                     <h5>Weight</h5>
//                     <p className={style.weight}>
//                       {country.area} <strong>KG</strong>
//                     </p>
//                     <h5>Temperaments</h5>
//                     <p className={style.temperaments}>
//                       {country.touristActivities?.join(", ")}
//                     </p>
//                   </div>
//                 );
//               })
//             ) : (
//               <Load />
//             )}
//           </div>
//         </div>
//       );
//     }
 


// }