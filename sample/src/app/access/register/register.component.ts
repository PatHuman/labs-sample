import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { AccountService } from '../account.service';
import * as _ from 'underscore';


import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";

import { Observable } from "rxjs/Rx";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../../../assets/css/app.css']
})

export class RegisterComponent implements OnInit {

   registerForm: FormGroup;

  constructor(private router:Router,private formBuilder: FormBuilder,private account:AccountService) {


    this.registerForm = formBuilder.group({


      'givenName'   : ['',Validators.required],
      'surname'   : ['',Validators.required],
     // 'username'   : ['',Validators.required],
      'email'	   : ['',Validators.required],
     // 'firstname'  : ['',Validators.required],
     // 'lastname'   : ['',Validators.required],
      'password'   : ['',Validators.required],
      'passconf'   : ['',Validators.required]


    });
/*
  	let password = new FormControl('', Validators.required);
	let confirmPassword = new FormControl('', [Validators.required,CustomValidators.equalTo(password)]);

    this.registerForm = formBuilder.group({


      'username'   : ['',Validators.required],
      'email'	   : ['',Validators.required,CustomValidators.email],
      'firstname'  : ['',Validators.required],
      'lastname'   : ['',Validators.required],
      'password'   : password,
      'passconf'   : confirmPassword,


    });
*/
  }

  ngOnInit() {
  }

  //taken

   saveForm(){

     this.account.createAccount(_.omit(this.registerForm.value,'passconf')).subscribe(data => {
      this.closeForm();
       this.router.navigateByUrl('/login');
     },
   err=>console.log(err));

  }

  closeForm(){

  this.resetForm();
  //this.onClosed.emit(null);
}

resetForm(){
   console.log('resetting')

  this.registerForm.reset();

}

}
