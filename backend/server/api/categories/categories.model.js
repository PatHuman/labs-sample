'use strict';

import mongoose from 'mongoose';

var CategoriesSchema = new mongoose.Schema({
  	name			: String,
  	info 			: String,
  	active 			: Boolean,
  	sid 			: String,
	description		: String,		 
	icon			: String,
	shared			: Boolean,
	dtype			: String,
	sharedid		: String,
	parent			: String,
	parentid		: String,
	sub				: Boolean,
	owner			: String, // user central ref
	ownerid			: String, // user central ref
	icon			: String, // user central ref
	createdby		: String, // user full name
	created			: Date,  //{ type: "date", time: true },	
	updated			: Date, // { type: "date", time: true },
	updatedby		: String,
	updatedbyid		: String,
});

export default mongoose.model('Categories', CategoriesSchema);
