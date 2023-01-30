const axios = require("axios")

const HOST = "localhost";
const PORT = "3001";


const filter = (filter, countries) => {
    const { continent, population, tourist_activities, alpha} = filter;

    let newCountries = countries;

    if (continent) {
        newCountries = newCountries.filter(country => country.continent === continent);
    }

    if (tourist_activities) {
        newCountries = newCountries.filter(country => country.name === tourist_activities);
    }

    if (population) {
        if (population === 'Population ASC') {
            newCountries.sort((countryA, countryB) => {
                return countryA.population - countryB.population;
            });
        } else {
            newCountries.sort((countryA, countryB) => {
                return countryB.population - countryA.population;
            });
        }
    }

    if (alpha) {
          if (alpha === 'DES') {
            newCountries.sort((countryA, countryB) => {
                return countryB.name.charCodeAt(0) - countryA.name.charCodeAt(0);
            });
        } else {
            newCountries.sort((countryA, countryB) => {
                return countryA.name.charCodeAt(0) - countryB.name.charCodeAt(0);
            });
        }
    }

    return newCountries.length ? newCountries : { error: 'Country Not Found' }
}



const paises = async function (id) {
    try {
        let countries = await axios(`http://${HOST}:${PORT}/countries`)
        return countries.data
    } catch (error) {
        return  error.message
    }
}


paises()
.then((data) => console.log(filter({continent:"Europe",alpha:"ASC"},data)))
.catch((error) => console.log(error))