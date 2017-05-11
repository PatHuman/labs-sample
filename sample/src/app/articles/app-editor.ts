import { Component, OnInit } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader/ngx-uploader';
import {NgIf} from '@angular/common';

 

 

@Component({
  selector: 'app-editor',
  templateUrl: './app-editor.html',
  styleUrls: ['./article.component.css']
})

//@Directive({ selector: '[ng2FileSelect]' });
//@Directive({ selector: '[ng2FileDrop]' });

export class AppEditorComponent implements OnInit {

  //private zone: NgZone;
  //private options: NgUploaderOptions;

 constructor() { }

  ngOnInit() {}

  drinks:any = [
    {value: 'coke-0', viewValue: 'Coke'},
    {value: 'long-name-1', viewValue: 'Decaf Chocolate Brownie Vanilla Gingerbread Frappuccino'},
    {value: 'water-2', viewValue: 'Water'},
    {value: 'pepper-3', viewValue: 'Dr. Pepper'},
    {value: 'coffee-4', viewValue: 'Coffee'},
    {value: 'tea-5', viewValue: 'Tea'},
    {value: 'juice-6', viewValue: 'Orange juice'},
    {value: 'wine-7', viewValue: 'Wine'},
    {value: 'milk-8', viewValue: 'Milk'},
];


  /* 
  private progress: number = 0;
  private response: any = {};

  constructor(private zone:ngZone, private options: NgUploaderOptions) { }

  ngOnInit() {

    this.zone = new NgZone({ enableLongStackTrace: false });
    this.options = {
      url: 'http://api.ngx-uploader.com:10050/upload',
      filterExtensions: true,
      allowedExtensions: ['image/png', 'image/jpg'],
      calculateSpeed: true,
      data: {
        userId: 12,
        isAdmin: true
      },
      customHeaders: {
        'custom-header': 'value'
      },
      authToken: 'asd123b123zxc08234cxcv',
      authTokenPrefix: 'Bearer'
    };
  }
 

   handleUpload(data: any): void {
    this.zone.run(() => {
      this.response = data;
      this.progress = Math.floor(data.progress.percent / 100);
    });
  }
 
 */

  public editorContent = `<p>My HTML</p>`;
  public editorConfig = {
    placeholder: "Article content..."
  };
   
  onEditorCreated(quill) {
    console.log('this is quill object', quill);
  }
  onContentChanged({ quill, html, text }) {
    console.log(quill, html, text);
  }

    tiles: any[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  folders:any[]=[
  	{name:"Incomes",updated:new Date("February 4, 2016 16:20:00")},
  	{name:"Concepts",updated:new Date("March 4, 2016 11:30:00")},
  	{name:"Plans",updated:new Date("December 4, 2016 12:12:00")}
  ];
  notes:any[]=[
  		{name:"Cours du soir",updated:new Date("February 4, 2016 16:20:00")},
  	{name:"Ploymers",updated:new Date("March 4, 2016 11:30:00")},
  	{name:"Abantu",updated:new Date("December 4, 2016 12:12:00")}
  ];

}
