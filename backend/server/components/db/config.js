'use strict';
 
/*
	the returned  properties (dbs, dbCons, and dbSrc) are objects representing:
	 databases [dbs], their  connections [dbCon],and their schema [dbSrc] .

	 Notes: dbname is used as key in (dbs, dbCons, and dbSrc) Objects


*/

exports.dbparams = function(){

	return{

		domain : '127.0.0.1',

		dbs	   		: {
			 
			colab		:'colab'
		},

		dbCons 		: {
		 
			colab 		:	'mysql://devman:devmanpass@localhost/colab'

		},
		dbSrc  		: {
			 
			colab		: __dirname+"/schema/colabdb",


		}
	}

}
