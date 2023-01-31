const { Router } = require('express');
const { Country, Tourist_activity, conn } = require('../db');
const axios = require('axios');
const { Op } = require("sequelize");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


  router.get('/countries', async (req, res) => {
      try {
          const { name } = req.query;
          let countries;
          if(name) {
              countries = await Country.findAll({
                  where: {
                      name: { [Op.iLike]: `%${name}%` }
                  },
                  include: [{
                      model: Tourist_activity,
                      as: 'tourist_activities'
                  }]
              });
          } else {
              countries = await Country.findAll({
                  include: [{
                      model: Tourist_activity,
                      as: 'tourist_activities'
                  }]
              });
              if(countries.length === 0) {
                  await axios.get('https://restcountries.com/v2/all')
                  .then(response => {
                   var countriesApi = response.data;  
                
                   countriesApi.forEach(async element => {
                      let capitalnu = ""
                      if(element.capital) capitalnu = element.capital
                      else capitalnu = "no tiene"
                                        
                   await Country.create({
                      id:element.alpha3Code,
                      name: element.name,
                      flag: element.flag,
                      continent: element.region,
                      capital: capitalnu ,
                      subregion: element.subregion,
                      area:element.area,
                      population: element.population}                    
                        )
                    })
                    })
               }
          }
          
          if (countries.length > 0) {
              res.status(200).send(countries);
          } else {
              res.status(404).send({ error: "No countries found" });
          }
      } catch (error) {
          res.status(400).send({ error: error.message });
      }
  });
  


router.get('/countries/:id', async (req, res) => {
 try {
    const country = await Country.findByPk(req.params.id, {
        include: [Tourist_activity]
    });
    if (country) {
        res.status(200).send(country);
    } else {
        res.status(404).send({ error: "Pais no encontrado" });
    }
} catch (error) {
    res.status(400).send({ error: error.message });
}   
});

router.post('/activities', async (req, res) => {
    try {
        const { name, difficulty, duration, season, countryIds } = req.body;
        const activity = await Tourist_activity.create({
            name,
            difficulty,
            duration,
            season
        });
        await activity.setCountries(countryIds);
        res.status(201).send({ message: "Actividad creada exitosamente" });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});



module.exports = router;
