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
  selector: 'cmt-form',
  templateUrl: './cmt-form.html',
  styleUrls: ['./cmt-box.component.css','../articles/articles.component.css'],
 // providers:[ArticleService]
})
export class CmtFormComponent implements OnChanges  {

  cmtForm: FormGroup;
   @Output() onCmtClosed = new  EventEmitter();
   @Output() onNewCmt = new  EventEmitter();
   @Input()  entity:any



 // from lab

  result:boolean = false
 public list:any[] = [

 {title:'ads', ol:"3"},
 {title:'aas', ol:"3"},
 {title:'assass', ol:"3"}

 ];




  constructor(private service:ArticleService, private myElement: ElementRef,private formBuilder: FormBuilder) {


    this.cmtForm = formBuilder.group({


      'entity'		: [''],
      'entityname'	: [''],
      'entitytype'	: [''],
      'created'		: [''],
      'retired'		: [false],
      'comment'		: ['', Validators.required],
      'owner'     : ['Dev Man',Validators.required],
      'ownerid'   : ['003',Validators.required],


    });

    this.cmtForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );


  }


 ngOnChanges(changes){

  // console.log(changes.entity.currentValue.title);
  this.setupForm(changes.entity.currentValue);

 }

 setupForm(data){

   let newEntity = {
      entity:data._id,
      entityname:'article',
      entitytype:'article'
   };

  this.cmtForm.patchValue(newEntity);

 }

  clearForm(){

    this.cmtForm.reset();
  }

  closeForm(){
    this.clearForm();
    this.onCmtClosed.emit(null);
  }

  onSubmit() {
    //console.log(this.artiForm.value);
    let url="/api/comments/"

    this.service.postData(url,this.cmtForm.value).subscribe(data => {

        this.onNewCmt.emit(data);
        this.closeForm();
        //console.log(data)

      });
  }

  exampleValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'Example') {
      return {example: true};
    }
    return null;
  }

  asyncExampleValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'Example') {
            resolve({'invalid': true});
          } else {
            resolve(null);
          }
        }, 1500);
      }
    );
    return promise;
  }




  public editorContent = `<p>My HTML</p>`;
  public editorConfig = {
    placeholder: "Comment here...",
    theme: 'bubble'
  };

  onEditorCreated(quill) {
    console.log('this is quill object', quill);
  }
  onContentChanged({ quill, html, text }) {
    console.log(quill, html, text);
  }


}
