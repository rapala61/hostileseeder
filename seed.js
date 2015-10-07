

// Require necessary node libraries installed via npm
var requestify = require ('requestify');
var mongoose = require('mongoose');

// configuration

/*
  CUSTOMIZE
  with the Mongo database for your project
  exp:
    mongoose.connect('mongodb://localhost/tacos');
    mongoose.connect('mongodb://localhost/chirps');
    mongoose.connect('mongodb://localhost/countries');
*/
mongoose.connect('mongodb://localhost/_countries', function() {

    /*
      Drop the DB
      Everytime you run the seed file, the mongo database is dropped and re-populated
     */
    mongoose.connection.db.dropDatabase();
});


// Models

/*
  CUSTOMIZE
  This should be your mongoose model. You have to create a model so you can use it
  when creating documents in your mongoose database.
*/
var Country = require('./models/country.js');



/*
  I am using requestify to make a RESTful GET call to an API and retrieving data
*/
requestify.get('https://restcountries.eu/rest/v1/all').then(function(response) {

  /*
    When the response is back, I then parse it into a javascript object.
    In the case of this example, response.body is an array of JSON objects.
    Each object contains country information.
  */
  var countries = JSON.parse(response.body);



  /*
    Now that I have all the response data parsed into the countries variable.
    I loop through each element (country).
  */
  for (var i = 0; i < countries.length; i++) {

    /*
      I create an object that will contain the document attributes
      for my Mongoose Country model.
    */
    var countryObject = {
      name: countries[i].name,
      capital: countries[i].capital,
      region: countries[i].region,
      population: countries[i].population
    };


    /*
      I then create a country by using the method 'create'
      and passing the countryObject as the first argument.

      A 'success' callback function is passed as the second argument.
      This function is in charge of logging is the creation was successful or not.
    */
    Country.create( countryObject , function( err, country ) {

      if ( err ) {
        console.log(err);
      }
      console.log('success! created: ' + country.name);
    });
  }

});
