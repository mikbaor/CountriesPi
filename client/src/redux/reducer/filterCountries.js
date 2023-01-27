export const filter = (filter, countries) => {
    const { continent, country, population, area } = filter;

    let newCountries = countries;

    if (continent) {
        newCountries = newCountries.filter(country => country.continent === continent);
    }

    if (country) {
        newCountries = newCountries.filter(country => country.name === country);
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

    if (area) {
        console.log('ordern ALPHA')
        if (area === 'ASC') {
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
