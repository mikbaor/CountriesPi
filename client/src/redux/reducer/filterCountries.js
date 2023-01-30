export const filter = (filter, countries) => {
    const { continent, population, tourist_activities, alpha} = filter;

    let newCountries = countries;

    if (continent) {
        newCountries = newCountries.filter(country => country.continent === continent);
    }

    if (tourist_activities) {
        newCountries = newCountries.filter(country => country.tourist_activities === tourist_activities);
    }

    if (population) {
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
