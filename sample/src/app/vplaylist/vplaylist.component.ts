import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { WindowRefService } from '../window-ref.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
 
} from "@angular/forms";
import { Observable } from "rxjs/Rx"; 

@Component({
  selector: 'vplaylist',
  templateUrl: './vplaylist.component.html',
  styleUrls: ['./vplaylist.component.css','../../assets/css/app.css']
})
export class VplaylistComponent implements OnInit {

  @Input() playlist:any[];
  @Output() onSelected = new  EventEmitter();  	
  filterForm     : FormGroup;

  constructor( private window:WindowRefService, private formBuilder: FormBuilder) { }

  ngOnInit() {


    this.filterForm = this.formBuilder.group({
      
      'filter'      : ['']
       
       
    });

  }


  selectVideo(ev,vid){


  	console.log(ev)
  	this.onSelected.emit(vid);
    ev.preventDefault()
  	return false;
  }

}
