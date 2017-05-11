'use strict';

import mongoose from 'mongoose';

var ArticlesSchema = new mongoose.Schema({
  			
	/*
	title 			: String,
	content			: String,	 
	status			: String,
	category		: String,
	categoryid		: String,
	info			: String,
  	active			: Boolean
  	*/
 
					
			
	sid 			: String,
	title 			: String,
	content			: String,	 
	status			: String,
	category		: String,
	categoryid		: String,
	tags			: Array,	
		
	shared			: Boolean,
	dtype			: String,  // article
	sharedid		: String,	// central ref
	retired			: Boolean,

	owner			: String, // user central ref
	ownerid			: String, // user central ref
	
	createdby		: String, // user full name
	created			: Date,  //{ type: "date", time: true },	
	updated			: Date, // { type: "date", time: true },
	updatedby		: String,
	updatedbyid		: String,		
			
			 				 
 
});

export default mongoose.model('Articles', ArticlesSchema);
