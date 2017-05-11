 

// categories
export interface Category{

	sid?:string,
	name:string,
	description?:string,
	sub:boolean,
	parent?:string, 
	psid?:string

}

// articles
export interface Article{

	sid?:string,
	title:string,
	categoryid?:string,
	category?:string,
	content:string,
	shared:boolean,
	status:string, 
	retired?:boolean,
	updated?:string


}

// author
export interface Author{

	uid?:string,
	fullname:string,
	email:string 

}

// comment
export interface Comment{

	sid?:string,
	article:string,
	conent:string 

}

 