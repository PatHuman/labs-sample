import { Injectable } from '@angular/core';
import { Http,Response,Headers,URLSearchParams,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore';

import {CookieService} from 'angular2-cookie/core';
import { CoolHttp,HttpHeader } from 'angular2-cool-http';

@Injectable()
export class AccountService {

 url = "http://localhost:8000/api/signup";
 headers:any;

  constructor(private http:Http, private coolHttp:CoolHttp, private cookies:CookieService) {


  //	coolHttp.registerBaseUrl('http://localhost:9000');

    //coolHttp.setWithCredentials(true);
  }

  createAccount(data) {

   //
   let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Access-Control-Allow-Origin','*');
      let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.post(this.url,data).map((res:Response) => res.json());
   /*  this.coolHttp.postObservable(this.url,data,options)
      .subscribe(
        data => {
          console.log(data);
          //this.user$ = this.userState();
          // this.userState();

        },
        err => console.log(err),
        () => console.log('Request Complete')
      );
      */
  }

}
