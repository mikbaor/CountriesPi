import { DETAILS_COUNTRIES, GET_COUNTRIES, ERROR, GET_COUNTRIES_BY_NAME, GET_TOURISTACTIVITY, FILTER_COUNTRIES, CREATE_COUNTRIES, CLEAR_DETAIL_COUNTRIES } from "./Types"
import axios from 'axios'

const HOST = "localhost";
const PORT = "3001";


export const getCountries = () => {
    return async function (dispatch) {
        try {
            let countries = await axios(`http://${HOST}:${PORT}/countries`)
            return dispatch({ type: GET_COUNTRIES, payload: countries.data })
        } catch (error) {
            return dispatch({ type: ERROR, payload: error })
        }
    }
}


export const getCountriesByName = (name) => {
    return async function (dispatch) {
        try {
            let countries = await axios(`http://${HOST}:${PORT}/countries?name=${name}`)
                return dispatch({ type: GET_COUNTRIES_BY_NAME, payload: countries.data })
            } catch (error) {
                return dispatch({ type: ERROR, payload: error.message })
        }
    }
}

export const getTouristActivity = (id) => {
    return async function (dispatch) {
        try {
            let touristActivity = await axios(`http://${HOST}:${PORT}/countries/${id}`)
            return dispatch({ type: GET_TOURISTACTIVITY, payload: touristActivity.data.tourist_activities })
        } catch (error) {
            return dispatch({ type: ERROR, payload: error })
        }
    }
}

export const detailsCountries = (id) => {
    return async function (dispatch) {
        try {
            let countries = await axios(`http://localhost:3001/countries/${id}`);
                 return dispatch({ type: DETAILS_COUNTRIES, payload: countries.data })
        } catch (error) {
                  return dispatch({ type: ERROR, payload: error })
        }   
    }
}

export const createCountry = (data) => {
    return async function (dispatch) {
        try {
            let countries = await axios.post(`http://localhost:3001/countries`, data);

            return dispatch({ type: CREATE_COUNTRIES, payload: countries.data })
        } catch (error) {
            return dispatch({ type: ERROR, payload: error.message })
        }
    }
}

export const clearDetailCountries = () => {
    return function (dispatch) {
        return dispatch({ type: CLEAR_DETAIL_COUNTRIES, payload: {} })
    }
}


export const filterCountries = (filter) => { // recibe el array de filtros continent, population, tourist etc
    return function (dispatch) {
        return dispatch({ type: FILTER_COUNTRIES, payload: filter }) //se asigna el array al payload
    }
}
