import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCountry } from "../../redux/action/actions";
import style from "./form.module.css";
import { validator } from "./valid";

export default function CreateTouristActivity() {
    const navigate = useNavigate();
    const dispatch = useDispatch();  
    const [animationTriger, setAnimationTriger] = useState(false);
    const [errors, setErrors] = useState({});
    const canSubmit = Object.entries(errors).length === 0;
    const touristActivity = useSelector((state) => state.touristActivity);
    

    const [formData, setFormData] = useState({
      name: "",
      difficulty: "",
      duration: "",
      season: "",      
      countries: []
     
    });


  // Manejador de eventos para actualizar el estado cuando el usuario ingresa información
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
    setErrors(validator({ ...formData, [name]: value }));
  };

  const handleTemp = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: [...new Set([...formData.difficulty, value])],
    });
    setErrors(
      validator({
        ...formData,
        [name]: [...new Set([...formData.difficulty, value])],
      })
    );
  };

  // Manejador de eventos para enviar la información del formulario al servidor
  const handleSubmit = (event) => {
    event.preventDefault();
    // add valitatons

    // Enviar la información al servidor
    const { name, difficulty, season,duration,countries } = formData;

    const mapData = {
      name,
      difficulty,
      season,
      duration,
      countries, 
      
    };

    dispatch(createCountry(mapData));
    setAnimationTriger(true);
  };

  const handlerGoHome = (e) => {
    navigate("/home");
  };
 
  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <h1>Create Tourist Activity</h1>
        <button className={style.gohome} onClick={handlerGoHome} type="submit">
          HOME
        </button>
        <div className={style.cardinfo}>
          {[formData].map((activity, i) => {
            return (
              <>
                <h1 key={2} className={style.preview}>
                  Preview
                </h1>
                <div
                  key={i}
                  className={`${style.dogBox} ${
                    animationTriger ? style.animation : null
                  }`}
                >
                  <h3>{activity.name}</h3>
                  <h5>Difficulty</h5>
                  <p>{activity.difficulty}</p>
                  <h5>Season</h5>
                  <p>{activity.season}</p>
                  <h5>Duration</h5>
                  <p className={style.countries}>
                    {formData.countries?.join(", ")}
                  </p>
                </div>
              </>
            );
          })}

          <div className={style.col}>
            <input
              style={errors.name && { border: "2px solid red" }}
              type="text"
              name="name"
              placeholder="NAME"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          {errors.name && <span className={style.error}>{errors.name}</span>}
          <p className={style.col}>
            <input
              style={errors.difficulty && { border: "2px solid red" }}
              type="text"
              name="difficulty"
              placeholder="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            />
            <input
              style={errors.duration && { border: "2px solid red" }}
              type="text"
              name="duration"
              placeholder="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </p>
          {errors.duration && (
            <span className={style.error}>{errors.difficulty}</span>
          )}
          <p className={style.col}>
            <input
              type="text"
              style={errors.season && { border: "2px solid red" }}
              name="season"
              placeholder="Season"
              value={formData.season}
              onChange={handleChange}
            />
          </p>
          {errors.season && (
            <span className={style.error}>{errors.season}</span>
          )}
          <div className={style.col}>
            <label>Countries: </label>
            <select name="Countries" onChange={handleTemp}>
             <option value="Mexico"></option>
            </select>
          </div>
        </div>
        {errors.countries && (
          <span className={style.error}>{errors.countries}</span>
        )}
        <button
          className={style.buttonSubmit}
          style={{ marginTop: 20 }}
          disabled={!canSubmit}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}




// {countries.map((country, index) => (
//     <option key={index} value={country.name}>
//       {country.name}
//     </option>
//   ))}
