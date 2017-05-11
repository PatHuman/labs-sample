import { Injectable } from '@angular/core';
import { Http ,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'underscore';
//import { Observable } from 'rxjs';


@Injectable()
export class ArticleService {

  viewManager:any;
  private icons;
  private urls= {
    artis:"/api/articles",
    cats: "/api/categories",
    icons: "/assets/icons",
  } ;
  private catsChannel = new Subject<any>();
  private artiChannel = new Subject<any>();

  constructor(private http:Http) {

  //  this.setIcons();
    this.getCategories();
  }


  updateCatChannel(data: any) {
      this.catsChannel.next(data);
  }

  clearCatChannel() {
      this.catsChannel.next();
  }

  getCatChannel(): Observable<any> {
      return this.catsChannel.asObservable();
  }




    getCategories(){

      this.getData(this.urls.cats).subscribe(list =>  this.updateCatChannel(list) );
    }

  getIcons():any{


       return new Promise((resolve, reject) => {

         this.loadFile(this.urls.icons).subscribe(list => {

           let xtract = list.split("\n");
           let tmpList = []

           _.each(xtract,(line)=>{

               let tmp = line.split(" ");
               tmpList.push({name:tmp[0],code:tmp[1]});

             })

           resolve(tmpList);

           });


       });

  }

  setView(view){



  }


  loadFile(url){
      return this.http.get(url).map((res:Response) => res.text());

  }
  getData(url){

      return this.http.get(url).map((res:Response) => res.json());

  }

  postData(url,data){

        return this.http.post(url,data).map((res:Response) => res.json());

  }

}
