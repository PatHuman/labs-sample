import { Component, OnInit,Input } from '@angular/core';
//import { ArticleFormComponent } from './app-editor';
import * as _ from 'underscore';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs/Rx";
import {NgForm} from '@angular/forms';
import {ArticleService} from './article.service';

@Component({
  selector: 'article-panel',
  templateUrl: './article.panel.html',
  styleUrls: ['./articles.component.css',
            '../../assets/css/app.css',
            '../../assets/css/font.css',
    			  '../../assets/css/font-awesome.min.css',
    			  '../../assets/css/simple-line-icons.css'],
  //providers:[ArticleFormComponent]
})
export class ArticlePanelComponent implements OnInit {

  @Input() icons:any[];

 categories:any[];
 categoryNames=[];
 articles:any[];
 currentArticle ={};
 editableArti ={};
 comments:any[];
 showCatForm = false;
 currentCat  :Object = {};
 catUpdateMode = false;
 artiUpdateMode = false;

 mainViews = {
 	forms:{
 		cmt:false,
 		arti:false,
    cat:false,
 	},
 	views:{
 		arti:false,
 		cat:false,

 	}
 };




  formOpened:boolean = false;

    urls= {

    cats: "/api/categories/",
    arti: "/api/articles/",
    cmt: "/api/comments/list/",

  } ;



  constructor(private service:ArticleService) { }

  ngOnInit() {
  	this.getCategories();
  	this.getAtricles();
  }

  getCategories(){

    this.service.getData(this.urls.cats).subscribe(list => {

    	 this.categories = list ;
    	 this.categories.push({name:"None",_id:"0"});

	     for (let item of this.categories) {
		     this.categoryNames.push(item.name);
		     //console.log(item)
	     }

	      console.log('from panel', this.categoryNames)
     });
  }
  getAtricles(){

    this.service.getData(this.urls.arti).subscribe(list =>  this.articles = list  );
  }

  editArticle(arti):void{
      this.artiUpdateMode = true;
      this.editableArti = arti;
      this.formOpened = true;
      console.log('edit-artic?')
  }


 openArtiForm(){
 	this.currentArticle = {}
 	this.formOpened = true;
  this.showCatForm = false;
  this.currentCat = {};
  this.currentArticle = {};
 }

 closedForm(){
 	this.formOpened = false;
 }

displayArticle(arti){

	this.currentArticle = arti;
	this.getComments(arti._id);
  this.showCatForm = false;
  this.formOpened  = false;
  this.currentCat = {};
  //this.artiUpdateMode = false;

}


commentArti(){

	this.mainViews.forms.cmt = true;
}

getComments(article){
	this.service.getData(this.urls.cmt+article).subscribe(list =>  this.comments = list  );
}
refreshCmts(cmt:any){
 	this.comments.push(cmt);
 }


closeCmtForm(){
	console.log('closing Cmt...')
	this.mainViews.forms.cmt = false;
}

closeCatFrom(){
  this.showCatForm = false;
}
openCatFrom(){
  this.showCatForm = true;
  this.formOpened  = false;
  this.currentCat = {};
  this.currentArticle = {};
}

  displayCat(cat){

    if(!this.catUpdateMode){
      this.currentCat = cat;
      this.showCatForm = false;
      this.formOpened  = false;
      this.currentArticle = {};
    }



  }

manageView = {

  clear:(type)=>{


    for(let i=0; i< this.mainViews[type].length; i++){
      this.mainViews[type][i] = false;
    }



  },
  set:(type,view)=>{
    this.mainViews[type][view] = true;
  }


}
 /*

 mainViews = {
  forms:{
    cmt:false,
    arti:false,
    cmt:false,
  },
  view:{
    arti:false,
    cat:false,

  }
 };
 */
 public list:any[] = [

 {title:'ads', ol:"3"},
 {title:'aas', ol:"3"},
 {title:'assass', ol:"3"}

 ]

}
