var mongoose = require( "mongoose" );

// Schema

var countrySchema =  mongoose.Schema({
  name: { type: String },
  capital: { type: String },
  region: {type: String },
  population: {type: Number}
});

// Mongoose Middleware

// countrySchema.pre('save', function( next ) {
//   now = new Date();
//   this.updated_at = now;
//
//   if ( !this.created_at ) {
//     this.created_at = now;
//   }
//   next();
// });

module.exports = mongoose.model('Country', countrySchema);
