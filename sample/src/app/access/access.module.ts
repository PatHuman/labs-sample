import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AccessRoutingModule } from './access-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
  BrowserModule,
    CommonModule,
        FormsModule,
    ReactiveFormsModule,
    AccessRoutingModule,
    MaterialModule.forRoot()
  ],
  declarations: [LoginComponent, RegisterComponent, UserComponent],
  exports: [UserComponent]
})
export class AccessModule { }
