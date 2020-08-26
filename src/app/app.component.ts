import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userForm:FormGroup;
  searchTerm:any;
  tableHeaders:any=['username','location','password','confirmpassword','edit','delete'];
  details:any=[
    {
      username: "syam",
      location: "vizag",
      password: "syam",
      confirmpassword: "syam"
    },
    {
      username: "akhil",
      location: "hyd",
      password: "akhil",
      confirmpassword: "akil"
    },
    {
      username: "gopi",
      location: "vizag",
      password: "gopi",
      confirmpassword: "gopi"
    }
  ];
  dataSource: MatTableDataSource<any>;
  isEdit:boolean;
  index:any;
  @ViewChild('f') myNgForm;
  constructor(private fb:FormBuilder){
  }

  ngOnInit(){
    this.initForm();
    this.getData();
  }

  initForm(data?){
    this.userForm=this.fb.group({
      username:[data?data.username:'',Validators.required],
      location:[data?data.location:'',Validators.required],
      password:[data?data.password:'',Validators.required],
      confirmpassword:[data?data.confirmpassword:'',Validators.required],
    },{validator: this.passwordsMatchValidator});
  }

  getData(){
    this.dataSource = new MatTableDataSource(this.details);
  }

  save(){
  this.details.push(this.userForm.value);
  this.getData();
  this.myNgForm.resetForm();
  }

  delete(ind){
    this.details.splice(ind,1);
    this.getData();
  }

  edit(data,ind){
    this.index=ind;
    this.initForm(data);
    this.isEdit=true;
  }
  update(){
    this.details.splice(this.index,1,this.userForm.value);
    this.getData();
    this.isEdit=false;
    this.myNgForm.resetForm();
  }
  cancel(){
    this.isEdit=false;
    this.initForm();
  }
  passwordsMatchValidator(form: FormGroup) {
    if (form.get('password') && form.get('confirmpassword')) {
        return form.get('password').value === form.get('confirmpassword').value ? null : { mismatch: true };
    }
    return null;
  }
}
