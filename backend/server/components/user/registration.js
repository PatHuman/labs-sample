/**
  raodmap:

  pre-registration scope:

  -

*/

var utils = require('../utils/utils.js');
var async = require("async");
var uniqid = require('uniqid');
var passwordHash = require('password-hash');
var Password = require('node-password').Password;
var options = { length: 9,letters: true, numbers: true, special: true  };
var pw = new Password(options);
var _ = require('underscore');
var Promise = require('promise');




var getUniq = function(table,ref,prefix){



      var doVerify = ()=>{

        let uniq = uniqid();
        var verif = utils.buildSearch(ref);
        var check = verif.key;
            verif.search[check] = prefix+uniq;

        return new Promise(function (resolve, reject) {


            utils.checkExistance(table,verif,(err,exist)=>{
              if(!err){
                  if(!exist){
                      var  refid = {remote:uniq,full:prefix+uniq,prefix:prefix}
                      resolve(refid);
                  }else{
                     console.log('Found one!!!!')
                     doVerify();
                  }
              }else{
                console.log(err);
                reject(err);
              }
            });

          });


      }

    return   doVerify();



}

var localFootPrint = function(table,user,keys){
  /*
    create user locally
  */
      //passwordHash.generate('password123')
    var localid ={
      sid			    : keys.full,    //full-remoteid
			email		  	: user.email,
			firstname  	: user.givenName,
			lastname  	: user.surname,
			remoteid		: keys.remote,		// partial sid
			online   	  : false,
			active		  : false,
			verified		: false,
      created			: new Date(),
      updated			: new Date(),

    }

          return new Promise(function (resolve, reject) {

              table.create([localid],(err,localUser)=>{
                 if(!err){
                     resolve(localUser[0]);
                 }else{
                     reject(err);
                 }
              })


            });

}

exports.process = function (formData, req, res, next) {
    //console.log('Got registration request', formData,req.db);




    let prefix="gaps_";
    let table = utils.getdbTable(req.db,"gapeli_users");

    //  res.send(formData)



    async.waterfall([

      // Get unique id
        function(callback) {
          getUniq(table,"remoteid",prefix).then((data)=>{
            callback(null, data);

          },(err)=>{
            callback(err);
          })

        },

        // Create user locally
        function(keys,callback) {

            localFootPrint(table,formData,keys).then((localUser)=>{
              console.log('localFootPrint',localUser)
              callback(null, localUser);

            },(err)=>{
              callback(err);
            })
            //callback(null, 'three');
        }

    ], function (err, result) {
        // Moves on with Stormpath registration
        next();
        // res.send(formData)
    });

  }
