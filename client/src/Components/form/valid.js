export const validator = (data) => {
    const erros = {};

    if (!data.name) erros.name = 'Name is required'
    if (!data.difficulty) erros.difficulty = 'Weight is required'
    if (!data.duration) erros.duration = 'Height is required'
    if (!data.season) erros.season = 'Life span is required'
    if (!data.country.length) erros.country = 'One temperament at least is required'

    return erros
}