import { Component,ElementRef,Input,Output,EventEmitter,OnInit,OnDestroy } from '@angular/core';
import * as _ from 'underscore';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs/Rx";
import {NgForm} from '@angular/forms';

import { Category,Article,Author,Comment } from './article.model';
import { ArticleService } from './article.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'article-form',
  templateUrl: './article.form.html',
  styleUrls: ['./articles.component.css'],
 // providers:[ArticleService]
})
export class ArticleFormComponent implements OnInit, OnDestroy  {

  @Input() categories:any[];
  @Input() categoryNames:any[];
  @Input() edit:any;
  @Output() onClosed = new  EventEmitter();
  artiForm: FormGroup;
  categoriesListener: Subscription;




 // from lab

  result:boolean = false
 public list:any[] = [

 {title:'ads', ol:"3"},
 {title:'aas', ol:"3"},
 {title:'assass', ol:"3"}

 ]

 public query = '';

     filteredList:any[] = [];
   // public elementRef;
    selectedIdx: number;


  constructor(private service:ArticleService, private myElement: ElementRef,private formBuilder: FormBuilder) {


    this.artiForm = formBuilder.group({
     // 'article': formBuilder.group({

      'title': ['', Validators.required],
      'category': ['None', Validators.required],
      'categoryid': ['0', Validators.required],
      'status': ['WIP', Validators.required],
      'shared': [false, Validators.required],
      'retired': [false, Validators.required],
      'content': ['', Validators.required]
      // })

    });
    /*
    this.artiForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );
    */
    this.selectedIdx = -1;

    this.categoriesListener = service.getCatChannel().subscribe(list => {
      this.categories = list;
      console.log('updating cats from ArtiFormCompo')
    });
     //console.log('from form', this.categories)
  }

  ngOnInit() {
    //this.initForm();
    this.service.getCategories();

    if(this.edit){
      console.log('mam to',this.edit.title);
      this.initArticleForm(true);
    }
  }


  setupEdition(){

  }

  initArticleForm(edit){

    this.artiForm.reset(this.edit);
    //if(edit){}else{}


  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.categoriesListener.unsubscribe();
  }

closeForm(){

  this.resetForm();
  this.onClosed.emit(null);
}

resetForm(){

 

 this.artiForm.reset({categoryid:"0",category:"None"});

}

// LAB HERE



 filter(event: any) {
  // console.log(this.artiForm.controls.category.value)
   	this.query = this.artiForm.value.category;
        if (this.query !== "") {
            this.filteredList = this.categoryNames.filter(function (el) {
                //return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
                return (el.toLowerCase().substr(0,this.query.length) === this.query.toLowerCase()) == true;
            }.bind(this));



            if (event.code == "ArrowDown" && this.selectedIdx < this.filteredList.length) {
                this.selectedIdx++;
            } else if (event.code == "ArrowUp" && this.selectedIdx > 0) {
                this.selectedIdx--;
            }

            console.log(this.filteredList.length, this.result,this.query)

        } else {
            this.filteredList = [];
            this.result = false;
        }


    }

    select(item,id) {

        this.query = item;
        //this.artiForm.value.category = item;
        this.artiForm.get('category').setValue(item)
        this.artiForm.get('categoryid').setValue(this.categories[id]._id)
       // this.artiForm.setValue({category:"boo"});
         //this.artiForm.setValue({category:this.filteredList[this.selectedIdx]});
        this.filteredList = [];
        this.selectedIdx = -1;

        this.handleBlur();


    }

    setCategory(cat){
      this.artiForm.get('category').setValue(cat.name)
      //this.artiForm.get('categoryid').setValue(cat._id)
    }

    handleBlur() {

        if (this.selectedIdx > -1) {
        	this.artiForm.get('category').setValue(this.filteredList[this.selectedIdx])
            this.query = this.filteredList[this.selectedIdx];
            //this.artiForm.value.article.category = this.filteredList[this.selectedIdx];
        }
        this.filteredList = [];
        this.selectedIdx = -1;
    }

    handleClick(event) {

        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.myElement.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.filteredList = [];
        }
        this.selectedIdx = -1;
    }

// END LAB





  onSubmit() {
    //console.log(this.artiForm.value);
    let url="api/articles/"

    this.service.postData(url,this.artiForm.value).subscribe(data => console.log(data));
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


/*
	article={

		title:"test"
	};

    user = {
    username: 'Max',
    email: 'chris@test.com',
    password: 'test',
    gender: 'male'
  };

  genders = [
    'male',
    'female'
  ];





   onSubmit(form: NgForm) {
    console.log(form.value);
  }


  saveArticle(){

  	console.log();
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


}
