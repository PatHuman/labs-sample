var orm = require("orm");


 module.exports = function (db, cb) {



   		db.define("labs_users", {


			sid			    : String,    //full-remoteid
			email		  	: String,
			firstname  	: String,
			lastname  	: String,
			remoteid		: String,		// partial sid
			groups      : String,
      directory   : String,
      tenant      : String,
			online   	  : Boolean,
			active		  : Boolean,
			verified		: Boolean,
      created			: { type: "date", time: true },
      updated			: { type: "date", time: true },





    }, {
        methods: {

        },
        validations: {
        }
    });



	return cb();
};
