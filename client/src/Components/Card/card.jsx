import React from "react";
import { useSelector } from "react-redux";
import style from "./card.module.css"
import { useNavigate } from "react-router-dom";

export default function Card() {
  const country = useSelector((state) => state.detailCountry);
  const navigate = useNavigate();

  

  const { id, name, flag, continent, capital, subregion, tourist_activities,area, population } = country;

  console.log(tourist_activities)
  

  const handlerGoHome = (e) => {
    navigate("/home");
  };

  return (
    <div className={style.cardcontainer}>
      <button className={style.goHome} onClick={handlerGoHome} type="submit">
        HOME
      </button>
      <img className={style.cardimage}src={flag} alt={name} />

      <div className={style.cardinfo}>
        <div>
          <h2 className={style.cardtitle}>{name}</h2>
        </div>
        <div className={style.cardSubInfo}>
       
          <p>
            <strong>ID: </strong> {id}
          </p>
          <p>
            <strong>Continente: </strong> {continent} 
          </p>
          <p>
            <strong>Capital: </strong> {capital}
          </p>
          <p>
            {" "}
            <strong>Sub Region: </strong> {subregion}
          </p>
          <p>
            {" "}
            <strong>Area: </strong> {area} <strong> Km </strong>
          </p>
          <p>
            {" "}
            <strong>Population: </strong> {population} <strong> 
                People </strong>
          </p>
          {tourist_activities.length ?

        <div>
            <strong>Tourist Activity: </strong> {tourist_activities[0].name}
            <p>
                <strong>Dificulty: </strong> {tourist_activities[0].difficulty}
            </p>
            <p>
                <strong>Duration: </strong> {tourist_activities[0].duration}
            </p>
            <p>
                <strong>Season: </strong> {tourist_activities[0].season}
            </p>
            </div>
            : <p>no hay actividades</p>}
          
          
          
          
          
        </div>
      </div>
    </div>
  );
}

