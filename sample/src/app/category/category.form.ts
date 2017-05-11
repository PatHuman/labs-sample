import { Component ,ElementRef,Input,OnInit,Output,EventEmitter,OnDestroy} from '@angular/core';
//import {CategoryComponent} from './category.component';


import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs/Rx";
import {NgForm} from '@angular/forms';
import {ArticleService} from '../articles/article.service';
import { Subscription } from 'rxjs/Subscription';


//import { Category,Article,Author,Comment } from './article.model';

@Component({
  selector: 'category-form',
  templateUrl: './category.form.html',
  styleUrls: ['./category.component.css','../articles/articles.component.css'],

})

export class CategoryFormComponent  implements OnInit ,OnDestroy{

 //@Input() categories:any[];
// @Input() icons:any[];
 @Input() opened:boolean;
 @Output() onCatFormClose = new EventEmitter();
 categoriesListener: Subscription;


 //category = {};
  icons:any[];
  categories:any[];
  catForm     : FormGroup;
  currentCat  :Object = {};

  //categories  ;
  categoryList =[];
  updateMode  :Boolean = false;
  formOpened  :Boolean = false;
  result      :Boolean = false;
  public query = '';


  constructor(private myElement: ElementRef,private formBuilder: FormBuilder,
    private service:ArticleService
    ) {



    this.catForm = this.formBuilder.group({


      'name'      : ['',Validators.required],
      'sub'       : [false,Validators.required],
      'parent'    : [''],
      'parentid'  : [''],
      'icon'      : [''],
      'owner'     : ['Dev Man',Validators.required],
      'ownerid'   : ['003',Validators.required],
      'description' : [''],
      'filter' : [''],


    });


    this.categoriesListener = service.getCatChannel().subscribe(list => {
      this.categories = list;
        console.log('updating cats from CatFormComp')
    });
    /*
    this.catForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );

    this.catForm.valueChanges.subscribe(data => {
      console.log('Form changes', data)

    });
    */

    this.selectedIdx = -1;
    // this.initForm();

  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.categoriesListener.unsubscribe();
  }

  ngOnInit() {
    //this.initForm();
     this.service.getIcons().then((data)=>{
       this.icons = data;
       //console.log(this.icons)
     },(err)=>{ })

     }


 initForm(){



   // this.categoryList = this.categories.filter(n => )
    for (let item of this.categories) {
     this.categoryList.push(item.name);
     //console.log(item)
    }
 }


// Set Category Item

 setIcon(icon){

  this.catForm.get("icon").setValue(icon);
 }

 openForm(){

  this.formOpened = true;
  this.currentCat = {};

  if(this.categoryList.length == 0){
    this.initForm();
  }

 }




  closeForm(){

    this.clearForm();
    this.formOpened = false;
    this.updateMode = false;
    this.onCatFormClose.emit();

  }

  clearForm(){
    this.catForm.reset({filter:''});

  }



  displayCat(cat){

    if(!this.updateMode){
      this.currentCat = cat;
      this.formOpened = false;
    }



  }


  editCat(cat){


    //this.catForm.value = cat;
    this.updateMode = true;
    this.setupEdition(cat);
    this.formOpened = true;
    this.currentCat = {};


  }

  setupEdition(cat){

    this.catForm.patchValue(cat)
   // this.catForm:FormGroup = {};
   /*

    this.catForm = this.formBuilder.group({


      'name'      : [cat.name,Validators.required],
      'sub'       : [cat.sub,Validators.required],
      'parent'    : [cat.parent],
      'parentid'  : [cat.parentid],
      'icon'      : [cat.icon],
      'owner'     : [cat.owner,Validators.required],
      'ownerid'   : [cat.ownerid,Validators.required],
      'description' : [cat.description]


    });
    */

  }


     filteredList:any[] = [];
   // public elementRef;
    selectedIdx: number;

 filter(event: any) {


       this.query = this.catForm.value.parent;

        if (this.query !== "") {
            this.filteredList = this.categoryList.filter(function (el) {
                //return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
                return (el.toLowerCase().substr(0,this.query.length) === this.query.toLowerCase()) == true;
            }.bind(this));

            if(this.filteredList.length > 0){
               this.result = true;
            }

            if (event.code == "ArrowDown" && this.selectedIdx < this.filteredList.length) {
                this.selectedIdx++;
            } else if (event.code == "ArrowUp" && this.selectedIdx > 0) {
                this.selectedIdx--;
            }

            console.log(this.filteredList.length, this.result)

        } else {
            this.filteredList = [];
            this.result = false;
        }

        console.log("match:",this.filteredList)
 }

    select(item,id) {

        this.query = item;

        if(this.catForm.value.sub){

          this.catForm.get("parent").setValue(item);
          this.catForm.get("parentid").setValue(this.categories[id]._id);
        }

        this.filteredList = [];
        this.selectedIdx = -1;
        this.handleBlur();
    }

    handleBlur() {
      console.log("blur called")
        if (this.selectedIdx > -1) {
            this.query = this.filteredList[this.selectedIdx];
            this.catForm.get("parent").setValue(this.query);
            //this.select(this.filteredList[this.selectedIdx]);
        }
        this.filteredList = [];
        this.selectedIdx = -1;
    }

    handleClick(event) {
      console.log('outside click')
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







  saveForm() {
    console.log(this.catForm.value);
    let url = "/api/categories/";

     this.service.postData(url,this.catForm.value).subscribe(
       data => {
         this.closeForm();
         this.displayCat(data);
         //this.service
         //this.categories.push(data);
         this.service.getCategories()

       },
       err => console.log(err._body),

      );

  }



  changeValidator(control: FormControl): {[s: string]: boolean} {

    console.log(control);

    if(control.value === 'Example'){
      return {example: true};
    }
    return null;
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
    placeholder: "short description",
    theme:"bubble"
  };

  onEditorCreated(quill) {
    //console.log('this is quill object', quill);
  }
  onContentChanged({ quill, html, text }) {
   // console.log(quill, html, text);
  }

}
