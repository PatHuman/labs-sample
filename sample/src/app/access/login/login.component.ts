import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';


import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs/Rx";
//import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
  	'../../../assets/css/app.css',
  			  '../../../assets/css/font.css',
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;


  constructor(private router:Router,private formBuilder: FormBuilder,private auth:AuthService) {


    this.loginForm = this.formBuilder.group({


      'login'      : ['',Validators.required],
      'password'   : ['',Validators.required],


    });
  }


  ngOnInit() {
  }

  sendForm(){
    this.auth.authUser(this.loginForm.value).subscribe(data => {

      this.auth.ngCookies(data);
      this.auth.fetchUser()

      this.closeForm();
      
    },
  err=>console.log(err)
)}

  closeForm(){

  this.resetForm();
  //this.onClosed.emit(null);
}

resetForm(){


  this.loginForm.reset();

}

}
