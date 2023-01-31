import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import {  useSelector } from 'react-redux';


import style from './form.module.css'
import { validate, valideSubmit } from './validator/validato';
import { MultipleSelectionBox } from './selection/selection';

export const Form = () => {

  const countries =  useSelector(state=>state.allCountries  )
  let countriesNames = countries.map(country=> {return {label: country.name , value: country.id}})

  const [form, setForm] = useState({
    name:"",
    difficulty:"",
    season:"",
    duration:"",
    countryIds: []
  })


  const [errors, setErrors] = useState({
    name:"",
    difficulty:"",
    season:"",
    duration:"",
    countryIds:"",
    formCompleted:""
  })

  const [formCompleted, setFormCompleted] = useState(false)
  

  const changeHandler = (event) => {
    const property = event.target.name 
    const value = event.target.value

    setErrors(validate({
      ...form, 
      [property ]: value}))


    setForm({
      ...form, 
      [property ]: value})
  }

 

  const selectHandler = (event) => {
    setForm({...form, countryIds: [...form.countryIds, event.target.value ]} )
  }




  const submitHandler= (event) => {
    event.preventDefault()
    
    valideSubmit(form)
    
    axios.post("http://localhost:3001/activities",form)
      .then(res=>alert(res.data))
      .catch(err=>alert(err))
  }

 
  const  onDeletee = (country) => {
    setForm({...form, countryIds: form.countryIds.filter(c=> c !== country) } )
  }
 

  const validateForm = () => {
    (form.name && form.countryIds.length >=1 && form.duration && form.season) ? setFormCompleted(true) :
    setErrors({...errors, formCompleted: 'Oh Oh! It seems that we are missing information, please complete before submit' })
  
  }

  
 


  return (
    <div className={style.container}>

      <div className={style.formContainer}>
      <h1>Create an Activity</h1>

        <form onSubmit={submitHandler} className={style.form}>
         
          <div className={style.inputName}>
              <label htmlFor='name' >Name: </label>
              <input type="text" value={form.name} onChange={changeHandler} name="name" placeholder='Activity name...'/>
              {errors.name && <p className={style.errorText}>{errors.name}</p>}
          </div>


          <div className={style.inputCountry}>
              <label htmlFor='countryid'>Countries: </label>
              
              <select name="countryid" onChange={selectHandler}>
                  <option >Select</option>
                    { 
                      countriesNames.map(country=>{
                      return <option key={country.value} value={country.value}>{country.label}</option>
                      })
                    }
              </select>


          </div>
          {!form.countryIds.length && <p className={style.errorSelectText}>Select at least one country</p>}
          
         
         <div className={style.selectedContainer}>
          {
            form.countryIds.map(country=>{
              return <MultipleSelectionBox 
                  key = {country}
                  country ={country}
                  onDeletee = {onDeletee}
                />
            })
          }
          </div>

          <div className={style.inputDuration}>
            <label>Duration: </label>
            <input type="number" value={form.duration} onChange={changeHandler} name="duration"/>
            <span>hours</span>
          </div>
          {!form.duration && <p className={style.errorSelectText}>Please, tell us how long will it take</p>}


          
          <div className={style.inputLevel}>
            <label htmlFor='difficulty'>Level: </label>

            <input type="radio" id='1' name='difficulty' value='1' onChange={changeHandler} />
            <label htmlFor='1'>1</label>

            <input type="radio" id='2' name='difficulty' value='2' onChange={changeHandler}/>
            <label htmlFor='2'>2</label>

            <input type="radio" id='3' name='difficulty' value='3' onChange={changeHandler}/>
            <label htmlFor='3'>3</label>

            <input type="radio" id='4' name='difficulty' value='4' onChange={changeHandler}/>
            <label htmlFor='4'>4</label>

            <input type="radio" id='5' name='difficulty' value='5' onChange={changeHandler}/>
            <label htmlFor='5'>5</label>
          </div>
          {!form.difficulty && <p className={style.errorSelectText}>Select a level of dificulty </p>}
            


          <div className={style.inputSeason}>
            <div>
            <label>Season: </label>
              <input type="radio" id='spring' name='season' value='spring' onChange={changeHandler} />
              <label htmlFor='spring'> Spring</label>

              <input type="radio" id='summer' name='season' value='summer' onChange={changeHandler}/>
              <label htmlFor='summer'> Summer</label>
            </div>

            <div className={style.secondLineSeason}>
              <input type="radio" id='fall' name='season' value='fall' onChange={changeHandler}/>
              <label htmlFor='fall'> Fall</label>

              <input type="radio" id='winter' name='season' value='winter' onChange={changeHandler}/>
              <label htmlFor='winter'> Winter</label>
            </div>
          </div>
            {!form.season && <p className={style.errorSelectText}>Select a season</p>}


          <p className={style.confirmButton} onClick={validateForm}>Confirm if all its Ok</p>
          {errors.formCompleted && <p className={style.errorText}>{errors.formCompleted}</p>}

          <button type='submit' className={style.submitButton} disabled={formCompleted ? false:true}>Submit Activity</button>
        
        
        </form>
          <Link to="/home">
            <button className={style.returnButton}>Return to Home</button>
          </Link>

        </div>

        <div className={style.confirmForm}>
              <h3>Please, check the information before you submit</h3>
              <p>Activity: <span>{form.name}</span></p>
              <p>Countries: <span>{form.countryIds.join(", ")}</span></p>
              <p>Duration: <span>{form.duration} hours</span></p>
              <p>Level of dificulty: <span>{form.difficulty}</span></p>
              <p>Season:
                <span>
                  {form.season === 'fall' && 'Fall'}
                  {form.season === 'spring' && 'Spring'}
                  {form.season === 'winter' && 'Winter'}
                  {form.season === 'summer' && 'Summer'}
                </span></p>
        </div>
                      
      
           
      
     

    </div>
  )
}

