import { Component } from '@angular/core';
//import { Account, Stormpath } from 'angular-stormpath';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './access/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
  //'../assets/css/app.css'
  ]
})
export class AppComponent {

    tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];


  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

    app = {
        name: 'Back Office',
        version: '1.3.2',
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-info',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-light',
          headerFixed: true,
          asideFixed: true,
          asideFolded: false,
          asideDock: true,
          container: false
        }
      }

      constructor(private router:Router,private  auth:AuthService) {

      }


  /*
   user$: Observable<Account | boolean>;

  constructor(private stormpath: Stormpath) {
    this.user$ = stormpath.user$;
  }

  logout(): void {
    this.stormpath.logout();
  }
  */
}
