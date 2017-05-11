import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit , OnDestroy {

  user:any;
  logged: any;
  subscription: Subscription;

  constructor(private router:Router, private auth:AuthService) {

     this.subscription = auth.getUser().subscribe(user => { this.user = user; });

  }

  ngOnInit() {

   //this.checkUser();
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }
  checkUser(){
      this.user = this.auth.userState();
  }


  logout(){
    this.auth.logOutUser().subscribe(

      data => {
         //console.log(data);
         this.auth.sendUser(false);
         this.router.navigateByUrl('/home');

      },
        err => console.log(err),
       () => console.log('Request Complete')
    );
  }

}
