import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../../core/services/config.service';
import { fuseAnimations } from '../../../../core/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MatDialog  } from '@angular/material';
import {UnitDialogComponent} from '../../dialog/unit-dialog/unit-dialog.component'
import {SubjectService} from '../SubjectWebservice'
import {
  Router
} from '@angular/router';
 
@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss'],
  animations   : fuseAnimations

})
export class CreateSubjectComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  registerForm: FormGroup;
  registerFormErrors: any;
  tiles: any;
  unitList:any;
  showClassTeacher:boolean;
  teacherList:any;
  categoryList:any;
  picker:any;
  picker2:any;
  createForm(){
    this.showClassTeacher = false;
    this.registerForm = this.formBuilder.group({
      startDate           : [''],
      endDate           : [''],
      unit           : [''],
      unit_percent           : [''],
      hourlyWorking           : [''],
      estimateTime           : [''],
      private           : [''],
      title           : [''],
      classTeacher           : [''],
      assign_to           : [''],
      categoryId           : [''],
      completed           : [''],
      completedTimeMinute           : [''],
      description           : [''],
      estimatedTimeMinute           : [''],
      priority           : [''],
      status           : [''],
      subjectType           : [''],
      IncludeUnit  : [''],
       });
   this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
  });
  }
  category(){
    let dialogRef = this.dialog.open(UnitDialogComponent, {
      width: '350px',
     data: {  type:'category',action:'create'   }
  });
 dialogRef.afterClosed().subscribe(result => {
this.categoryGet();
  });
 
 
  }
  unitPercentage:any;
  total:any;
  addUnit(){
 
    let dialogRef = this.dialog.open(UnitDialogComponent, {
      width: '350px',
     data: {  type:'unit',action:'nothourly',option:'add',data: this.unitList }
  });
 dialogRef.afterClosed().subscribe(result => {
  
   this.total = result.total;
    this.unitList.push(result)
    
  });
 

  }
  editUnit(selected,index){
     let dialogRef = this.dialog.open(UnitDialogComponent, {
      width: '350px',
     data: {  type:'unit',action:'nothourly',option:'edit',data: this.unitList,selected:selected,index:index}
  });
 dialogRef.afterClosed().subscribe(result => {
    this.total = result.totalvalue
   this.unitList =     result.data
  });
 

  }
  deleterow(index){
    this.total = 0;

     this.unitList.splice(index, 1);
     
    for(var i =0 ;i<this.unitList.length;i++){
      this.total =  this.total + JSON.parse(this.unitList[i].percentage);
    }

  }
  categoryGet(){
      this.webservice.getcategorylistSem().subscribe(res=>{
         this.categoryList = res.data;
      })
  }
  teacherGet(){
    this.webservice.getteacherlistSem().subscribe(res=>{
      console.log(JSON.stringify(res));
      this.teacherList = res.data;
    })
}
testss:any;
test(){
 
this.testss =[]
let s= this.registerForm.value.assign_to.toString().split(",");
  for (var ext in s){
    for(var i =0;i<this.teacherList.length ;i++){
     if(this.teacherList[i].teacherId == s[ext]){
      this.testss.push(this.teacherList[i])
     }
   }
   }
    if(this.testss.length>0){
     this.showClassTeacher = true;
   }else{
    this.showClassTeacher = false;

   }
   
}
  onRegisterFormValuesChanged()
  {
      for ( const field in this.registerFormErrors )
      {
          if ( !this.registerFormErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.registerFormErrors[field] = {};

          // Get the control
          const control = this.registerForm.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.registerFormErrors[field] = control.errors;
          }
      }
  }

   constructor(private webservice:SubjectService,private dialog:MatDialog,private fuseConfig: FuseConfigService, private Route: Router, private formBuilder: FormBuilder) {
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });
  this.unitList =[];

  this.tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  this.registerFormErrors = {
    name           : {},
    email          : {},
    cemail          : {},
    mobileNo: {},
    password       : {},
    passwordConfirm: {}
};

  }

  ngOnInit() {
    this.createForm();
    this.categoryGet();
    this.teacherGet();
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['' ],
      IncludeUnit:['']
    });
  }
  unit:any;
  unitper:any;

  createSubject(){
    
    this.registerForm.value.status = "true"

   if(this.registerForm.value.hourlyWorking == false){
  this.registerForm.value.hourlyWorking = "No";
  this.registerForm.value.subjectType ="D";
  this.registerForm.value.estimateTime = "0"
  this.registerForm.value.completed = "0"

  this.registerForm.value.completedTimeMinute = "0"
  this.registerForm.value.estimatedTimeMinute = "0"


  }else{
  this.registerForm.value.hourlyWorking = "Yes";
  this.registerForm.value.subjectType ="H";

 }
 if(this.registerForm.value.private == false){
  this.registerForm.value.private = "No"
  this.unit = [];
  this.unitper = [];

  for(var i =0 ;i<this.unitList.length;i++){
  this.unit.push(this.unitList[i].name);
  this.unitper.push(this.unitList[i].percentage);


 }
 }else{
  this.registerForm.value.private = "Yes"
  this.unit = [];
  this.unitper=[];
 }

  
   this.registerForm.value.unit_percent = this.unitper.toString();
   this.registerForm.value.unit = this.unit.toString();
   this.registerForm.value.assign_to = this.registerForm.value.assign_to.toString();
 console.log(JSON.stringify(this.registerForm.value))
this.webservice.SubjectSave(this.registerForm.value).subscribe(res=>{
 
this.Route.navigate(['subject'])
})
  }
 
}
