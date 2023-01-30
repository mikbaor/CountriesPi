import React from "react";
import style from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { filter } from "../../redux/reducer/filterCountries";
import { filterCountries } from "../../redux/action/actions";
import { getCountries, clearDetailCountries } from "../../redux/action/actions";
import Load from "../loading/load";
import Navbar from "../navBar/navbar";
import Country404 from "../404/404";

const PAGINATE = 8;

export default function Home (){
    const dispatch = useDispatch();
    const countries = useSelector((state)=> state.allCountries)
    const filterCountries = useSelector((state)=> state.filterCountries)
    const Navigate = useNavigate()
    const [currentCountries, setCurrentCountries]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const errors = useSelector(state=>state.errors)
    
    let pagButtons = [];

    


    //----Logicas para obtener el numero de paginas y controlar el paginado-------

    //funcion para setear el avance de pagina
const nextPage = () => {
    if (maxPages>= currentPage + 1) {
        setCurrentCountries([]);
      setCurrentPage(currentPage + 1);
    }
  };
//funcion para setear el retroceso de pagina  
const previous = () => {
    if (!(currentPage - 1 < 1)) {
        setCurrentCountries([]);
      setCurrentPage(currentPage - 1);
    }
  };

   // funcion para los botones de los numeros 
    const changePageButtonHandler = (e) => {
        if (currentPage !== parseInt(e.target.name)) {// si la pagina es diferente 
          setCurrentCountries([]);    //setear el estado de current countries como vacio
          setCurrentPage(parseInt(e.target.name)); //despues setear la current page con numero del boton
        }
    }

 const maxPages = Math.ceil(filterCountries.length/10) //<-- dicta el numero de paginas redondeadas
 // despues pushea el html de cada boton en el array pagButtons
    for (let i = 1; i <= maxPages; i++) {
        pagButtons.push(
          <button
            key={i}
            className={
              currentPage + "" === i + ""
                ? style.currentPage
                : style.otherPage
            }
            name={i}
            onClick={changePageButtonHandler}
          >
            {i}
          </button>
        );
      }
//------------------------------------aqui termina funciones de paginado-------------

    useEffect(() => {
        filterCountries.length && setCurrentCountries(filterCountries);
      }, [filterCountries]);



    useEffect(() => {
        if (!countries.length) {
          dispatch(getCountries());
        } else {
          setCurrentCountries(countries.slice(0, PAGINATE));
        }
      }, [dispatch, countries]);
    
    useEffect(() => {
        dispatch(clearDetailCountries());
      }, [dispatch]);
    
    useEffect(() => {
        const maxRange = PAGINATE * currentPage;
        const minRange = maxRange - PAGINATE;
    
    setCurrentCountries(
          filterCountries.slice(
            minRange,
            maxRange >= filterCountries.length ? filterCountries.length : maxRange
          )
        );
      }, [currentPage, filterCountries]);



      return (
        <div className={style.container }>
         <Navbar Navigate = {Navigate} setCurrentPage={setCurrentPage}/>
           {
                <div className={style.pagination}>
                      <button onClick={previous}>Anterior</button>
                    {pagButtons.map((pagbutton) => pagbutton)}

                     <button onClick={nextPage}>Siguiente</button>
                </div>       
           } 
            <div className={style.countryContainer}>
        {errors ? (
          <Country404 />
        ) : currentCountries.length ? (
          currentCountries.map((country, i) => {
            return (
              <div
                key={i}
                className={style.countryBox}
                onClick={() => Navigate(`/country/${country.id}`)}
              >
                <h3>{country.name}</h3>
                <img src={country.flag} alt="" />
                <h5>Continent</h5>
                <p className={style.population}>
                  {country.continent} <strong></strong>
                </p>
              </div>
            );
          })
        ) : (
          <Load />
        )}
      </div>
        
        </div>
      )
            
} 
