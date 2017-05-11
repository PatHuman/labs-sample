import { Component, OnInit } from '@angular/core';
import {ArticleService} from './article.service';
import * as _ from 'underscore';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles:any[]  ;
  categories:any[]  ;
  icons:any[]   ;
  urls= {
    artis:"/api/articles",
    cats: "/api/categories",
    icons: "/assets/icons",
  } ;


  constructor(private service:ArticleService) {

  }

  ngOnInit() {

    this.getIcons();
    //this.getCategories();
  }



  getIcons(){

    this.service.loadFile(this.urls.icons).subscribe(list => {

        let xtract = list.split("\n");
        let tmpList = []

        _.each(xtract,(line)=>{

            let tmp = line.split(" ");
            tmpList.push({name:tmp[0],code:tmp[1]});

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

}
