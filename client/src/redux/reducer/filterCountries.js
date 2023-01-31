export const filter = (filter, countries) => {  // filter = array de filtros countries = array de paises
    const { continent, population, tourist_activities, alpha} = filter; // filter es el array de filtros escritos

    let newCountries = countries;

    if (continent) { // si recibimos continent
        newCountries = newCountries.filter(country => country.continent === continent);//filtramos si hay continete
    }

    if (tourist_activities) { 
        newCountries = newCountries.filter(country => country.tourist_activities.some(activity => activity.name === tourist_activities));
      }

      if (tourist_activities) { 
        newCountries = newCountries.filter(country => country.tourist_activities.some(activity => activity.name === tourist_activities));
      }
       // filtramos el nombre por los que tienen ese tourist activity y filtramos nuevamente despues newcountry

    if (population) { // El array que quedo se ordena por orden ascendente o descente tamaño de poblacion
        if (population === 'ASC') {
            newCountries.sort((countryA, countryB) => {
                return countryA.population - countryB.population;
            });
        } else {
            newCountries.sort((countryA, countryB) => {
                return countryB.population - countryA.population;
            });
        }
    }

    if (alpha) {// el array que quedo despues de aplicar los anteriores filtros se ordena alfabeticamente
          if (alpha === 'DESC') { //de la z a la A
            newCountries.sort((countryA, countryB) => {
                return countryB.name.charCodeAt(0) - countryA.name.charCodeAt(0);
            });
        } else {  // de la A a Z
            newCountries.sort((countryA, countryB) => {
                return countryA.name.charCodeAt(0) - countryB.name.charCodeAt(0);
            });
        }
    }

    return newCountries.length ? newCountries : { error: 'Country Not Found' }
}
