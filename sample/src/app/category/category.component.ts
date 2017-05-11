import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../articles/article.service';

import * as _ from 'underscore';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css','../articles/articles.component.css']
})
export class CategoryComponent implements OnInit {


  categories:any[]  ;
  icons:any[]   ;



  urls= {

    cats: "http://localhost:9000/api/categories/",
    icons: "/assets/icons",

  } ;

  getIcons(){

    this.service.loadFile(this.urls.icons).subscribe(list => {


        let xtract = list.split("\n");
        let tmpList = []

        _.each(xtract,(line)=>{

            let tmp = line.split(" ")
            tmpList.push({name:tmp[0],code:tmp[1]})


          })

         this.icons = tmpList;

      });
  }

  getCategories(){

    this.service.getData(this.urls.cats).subscribe(list => {
    	this.categories = list ;
    	console.log(this.categories);
    	});
  }

  constructor(private service:AppService) {


   }

  ngOnInit() {

  	this.getCategories();
  	this.getIcons();
  }



}
