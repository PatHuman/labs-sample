var orm = require("orm"),
 _ =   require('underscore'),
  async = require('async'),
  db = require('./config'),
  dbparams = db.dbparams();


 /*
	Non hooked connection:
 */

 var connections = {};

exports.connector= function(dbname, cb){

	 var host	 =  dbparams.domain;
	 var dbCon 	 =  dbparams.dbCons[dbname];
	 var dbSrc	 =  dbparams.dbSrc[dbname];
	 var dbs	 =  dbparams.dbs[dbname];

 if (connections[host] && connections[host][dbname]) {
		// console.log("used Existant connection")
    cb(null, connections[host][dbname]);

  }else{

	orm.connect(dbCon, function (err, db){

		if (err) throw err ;


		connections[host] = connections[host] || {};
		connections[host][dbname] = db;



			db.load( dbSrc, function (err) {
				if (err) throw err ;


				// console.log("used new connection");

				cb(null, db);


		});



	});
 }

}


  exports.getTable = function(dbname,table,cb){

	exports.connector(dbname,function(err,db){
		if(!err){
			cb(null,db.models[table])
		}else{
			cb(err)
		}
	});

}

  exports.getTables = function(dbname,tables,cb){

	var list = {};

	_.each(tables,function(tablename,key){
			exports.connector(dbname,function(err,db){
				if(!err){
					// list[key] =  db.models[tablename]
					db.models[tablename].all(function(err,data){
						if(!err){
							list[key] =  data;
						}else{
							cb(err)
						}
					})

				}else{
					cb(err)
				}
			});

	})

	cb(null,list)

}



  /* sync db at startup  and hook the req */

  exports.devSync = function(app,cn){

  app.use(orm.express( dbparams.dbCons[cn], {

 	    define: function (db, models,next) {
 			 // console.log(dbparams.dbSrc[cn])
   			db.load(dbparams.dbSrc[cn], function (err) {
   

   				 if (err) {

            console.log(err);

            }else{


         			db.sync(function (err) {
         			 if (err) {
         					console.log(err);
         				}else{
         					console.log("....."+cn+" db sync done !");
                   next();
         				}


         			});

           }


   			});





 	    }


 }));

  }

  /*
 exports.devSync = function(app,cn){

 app.use(orm.express( dbparams.dbCons[cn], {
	    define: function (db, models,next) {
			 // console.log(dbparams.dbSrc[cn])
			db.load(dbparams.dbSrc[cn], function (err) {


				 if (err) {
					console.log(err);
				}


			});


			db.sync(function (err) {
			 if (err) {
					console.log(err);
				}else{
					console.log("....."+cn+" db sync done !");
          next();
				}


			});



	    }


}));

 }
*/






exports.updateList = function (table,list, cb) {

		_.each(list,function(line){

				table.get(line.id, function (err, item) {

						if (err){
								cb(err)

						}else{

								item.save(line, function (err) {
									 if(err)  cb(err);

								});


						}

			});

		});

		cb(null,list);


}


exports.update = function (table,ref,data, cb) {

		 table.get(ref, function (err, item) {

				if (err){
						console.log(err)
					cb(err);

				}else{

					item.save(data, function (err) {
						 if(!err){
							cb(null,data);
						}else{
							cb(err)
						}

					});


				}

		});


}


exports.insertList = function ( table,data, cb) {

	table.create(data, function (err, items) {

				if (err){

					  cb(err);

				}else{

					   cb(null,items[0]);

				}
	});



}


exports.exists = function ( table,search ,cb) {

		 table.exists( search,function (err, items) {

					if (err){

						  cb(err);

					}else{

						   cb(null,items);


					}
		});



}

exports.all = function (table, cb) {


		 table.all( function (err, items) {

				if (err){

					 cb(err);

				}else{

					 cb(null,items);

				}
		});


}

exports.insert = function ( table,data, cb) {

	 table.create([data], function (err, items) {

			if (err){

				cb(err);

			}else{

				cb(null,items[0]);

			}
	});


}




exports.fetch = function(table,ref,cb){


		table.get(ref,function(err, item){

			if(err){

				 cb(err);

			}else{

				 cb(null,item);

			}


		});



}



exports.where = function( table,criteria,cb){



		 table.find(criteria, function (err, list) {

					if (err){
							console.log(err)
								  cb(err);

							}else{

								   cb(null,list);

							}
		});



}

exports.eject = function (table,ref, cb) {



    table.get(ref,function(err, item){
		if(err){
				  cb(err);
		}else{

			item.remove(function(err){

				 if (err){
				  cb(err);
				 }else{

					 cb(null,true);
				 }


			});
		}


	 });






}
exports.ejects = function ( table,list, cb) {

	_.each(list,function(line){

		 table.get(line.id,function(err, item){

				if(err){
					cb(err);
				}else{
					item.remove(function(err){
						if (err){
						  cb(err);
						 }

					});
				}
		 });
	});

	cb(null,true);


}
