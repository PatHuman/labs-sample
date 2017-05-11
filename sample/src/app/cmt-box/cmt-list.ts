import { Component,ElementRef,EventEmitter,Output,Input,OnChanges } from '@angular/core';

 
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs/Rx";
import {NgForm} from '@angular/forms';


import { ArticleService } from '../articles/article.service';

@Component({
  selector: 'cmt-list',
  templateUrl: './cmt-list.html',
  styleUrls: ['./cmt-box.component.css','../articles/articles.component.css'],
 // providers:[ArticleService]
})
export class CmtListComponent implements OnChanges  {


   @Output() onCmtsHide = new  EventEmitter();
   @Input()  comments:any[]


  constructor(private service:ArticleService, private myElement: ElementRef  ) {

  }


 ngOnChanges(changes){



 }



}
