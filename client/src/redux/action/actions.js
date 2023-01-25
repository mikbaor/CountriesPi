import { DETAILS_COUNTRIES, GET_COUNTRIES, ERROR, GET_COUNTRIES_BY_NAME, GET_TOURISTACTIVITY, FILTER_COUNTRIES, CREATE_COUNTRIES, CLEAR_DETAIL_COUNTRIES } from "./types"
import axios from 'axios'

const HOST = "localhost";
const PORT = "3001";


export const getCountries = () => {
    return async function (dispatch) {
        try {
            let countries = await axios(`http://${HOST}:${PORT}/countries`)
            console.log(countries.data);
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
            if (!countries.data?.msg) return dispatch({ type: GET_COUNTRIES_BY_NAME, payload: countries.data })
            return dispatch({ type: ERROR, payload: countries.data.msg })
        } catch (error) {
            return dispatch({ type: ERROR, payload: error.message })
        }
    }
}

export const getTouristActivity = () => {
    return async function (dispatch) {
        try {
            let touristActivity = await axios(`http://${HOST}:${PORT}/tourist`)
            return dispatch({ type: GET_TOURISTACTIVITY, payload: touristActivity.data.data })
        } catch (error) {
            return dispatch({ type: ERROR, payload: error })
        }
    }
}

export const filterCountries = (filter) => {
    return function (dispatch) {
        return dispatch({ type: GET_COUNTRIES, payload: filter })
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