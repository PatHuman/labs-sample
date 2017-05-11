import { Injectable } from '@angular/core';
import { Http,Response,Headers,URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore';
//import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {Router} from '@angular/router';

import {CookieService} from 'angular2-cookie/core';
import { CoolHttp,HttpHeader } from 'angular2-cool-http';

@Injectable()
export class AuthService {

  private user$: any = false;
  private loggedIn$: Observable<boolean>;
  private config = {
  	server:{
  		dev:"http://localhost:8000",
  		stage:""
  	},
  	uris:{
  		logged:"api/auth/me",
  		login:"api/token",
      logout:"logout",
  		register:"api/auth/register",
  	}
  };


  private subject = new Subject<any>();



  constructor(private router:Router,private coolHttp:CoolHttp,private http:Http, private cookies:CookieService) {

   coolHttp.registerBaseUrl('http://localhost:8000');

    coolHttp.setWithCredentials(true);

  	// this.userState().subscribe(data =>{

   //       this.sendUser(data);
   //   });

  }

  fetchUser(){

    this.userState().subscribe(data =>{

         this.sendUser(data);
         this.router.navigateByUrl('/projects/dashboard');
     });
  }
  sendUser(data: any) {
      this.subject.next(data);
  }

  clearMessage() {
      this.subject.next();
  }

  getUser(): Observable<any> {
      return this.subject.asObservable();
  }

  userState(){

    /*let cooks = `access_token=${Cookie.get('access_token')}; refresh_token=${Cookie.get('refresh_token')}`
    let headers = new Headers();
    headers.append('Cookies', cooks);
    console.log(cooks)*/

    //let url = this.config.server.dev+this.config.uris.logged;
  	let url = this.config.uris.logged;
    //this.service.getData(url).subscribe(data =>  console.log(data)  );
    //console.log(Cookie.get("access_token"))

       return this.http.get(url).map((res:Response) => res.json());


  }


  islogged(){
    // return this.user$ !== false;
    console.log(this.user$);
    if(!this.user$){
      return false;
    }
    return true;

  }


  authUserX(form){

  	let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

    //let url = this.config.server.dev+this.config.uris.login;
  	let url =  this.config.uris.login;

  	let body = new URLSearchParams();
		body.set('grant_type', 'password');
		body.set('username', form.username);
		body.set('password', form.password);




  	  // return this.http.post(url,body,{ headers }).map((res:Response) => res.json());

       this.coolHttp.postObservable(url,body)
      .subscribe(
        data => {
          this.ngCookies(data);
          //this.user$ = this.userState();
          // this.userState();

        },
        err => console.log(err),
        () => console.log('Request Complete')
      );




  }

  authenticator(){   }

  authUser(form){


  	//let url = this.config.server.dev+this.config.uris.login;
  	let url = '/api/token';

  	let body = new URLSearchParams();
		body.set('grant_type', 'password');
		body.set('username', form.login);
		body.set('password', form.password);



  	   return this.http.post(url,body)
      	.map((res:Response) => res.json());



  }

  ngCookies(auth){


    //let authCookie = `access_token=${auth['access_token']}; refresh_token=${auth['refresh_token']}`;
    //console.log(authCookie)
   // this.coolHttp.registerGlobalHeader(new HttpHeader('Cookie', authCookie));
    //this.coolHttp.sendCookieValueInCustomHeader('Cookie', authCookie);

           this.cookies.put('access_token',auth['access_token']);
            this.cookies.put('refresh_token',auth['refresh_token']);
            //console.log(auth['refresh_token'])
            this.userState()

  }


  checkCookie(cookie){

  	//return Cookie.check(cookie)
  }

  logOutUser(){

   // let url = this.config.server.dev+this.config.uris.logout;
   let url = '/api/logout';
   let body={};


   return this.http.post(url,body).map((res:Response) => res.text());


  	//this.userState();
  }

}
