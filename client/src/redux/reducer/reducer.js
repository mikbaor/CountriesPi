import { GET_COUNTRIES, GET_COUNTRIES_BY_NAME, ERROR, GET_TOURISTACTIVITY, FILTER_COUNTRIES, DETAILS_COUNTRIES, CREATE_COUNTRIES, CLEAR_DETAIL_COUNTRIES } from "../action/Types";
import { filter } from "./filterCountries";

const initialState = {
    allCountries: [],
    touristActivity: [],
    filterCountries: [],    
    detailCountry: null,
    errors: ''
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
                filterCountries: action.payload
            }

        case GET_COUNTRIES_BY_NAME:
            return {
                ...state,
                filterCountries: action.payload
            }

        case GET_TOURISTACTIVITY:
            return {
                ...state,
                touristActivity: action.payload
            }

        case FILTER_COUNTRIES:
            const result = filter(action.payload, [...state.allCountries]);
            if (result.length)
                return {
                    ...state,
                    filterCountries: result,
                    errors: ''
                }

                return {
                ...state,
                filterCountries: [],
                errors: result.error
                }


        case DETAILS_COUNTRIES:
            return {
                ...state,
                detailCountry: action.payload
            }

        case CREATE_COUNTRIES:
            return {
                ...state,
                allCountries: [...state.allCountries, action.payload],
                filterCountries: [...state.allCountries, action.payload]
            }

        case CLEAR_DETAIL_COUNTRIES:
            return {
                ...state,
                detailsCountries: null
            }

        case ERROR:
            return {
                ...state,
                errors: action.payload
            }



        default:
            return {
                ...state,
            }
    }
}

export default rootReducer;