import { Component } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nameInput = '';
  surnameInput = '';
  userData:any =[];
  id = new FormControl('');

  constructor(private http:HttpClient){
    this.http.get('http://localhost:9000/read').subscribe((res=>{
      console.log(res);
      this.userData=res;
    }))
  }

  Deleteid(){
    console.log(this.id.value);
    this.http.delete("http://localhost:9000/delete/"+this.id.value).subscribe((res=>{
      alert('Delete successful');
      window.location.reload();
    }));
  }

  profile = new FormGroup({
    name: new FormControl(this.nameInput,[
        Validators.required,
        Validators.minLength(4)
    ]),
    surname: new FormControl(this.surnameInput,[
      Validators.required,
      Validators.minLength(4)
    ])
  })
  OnSubmit(){
    this.http.post("http://localhost:9000/createdb",this.profile.value).subscribe((result => {
      alert('Submit successful');
      window.location.reload();
    }))
  }

  get name(){
    return this.profile.get('name');
  }

  get surname(){
    return this.profile.get('surname');
  }
}
