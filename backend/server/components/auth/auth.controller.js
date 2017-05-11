
'use strict';


// Checks if user exit : is logged in

import _  from  'underscore';

export function index(req, res) {

	console.log('wus here')

	var user  = false;

	if(req.user){

		user = _.pick(req.user,['email','fullName','givenName','surname']);

	}

	res.send(user);




}