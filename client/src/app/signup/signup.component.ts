import { Component, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
@ViewChild('signupForm') signForm;
  constructor(private authService:AuthService,private router:Router) { }

  image:File=null
  ngOnInit(): void {
  }
  imageUpload(e){
    this.image=e.target.files[0]
  }
  signupSubmit(){
    console.log(this.signForm.value);
    
    let formData=new FormData();
    formData.append('name',this.signForm.value.name)
    formData.append('username',this.signForm.value.username)
    formData.append('email',this.signForm.value.email)
    formData.append('password',this.signForm.value.password)
    formData.append('bio',this.signForm.value.bio)
    formData.append("location","signup")
    if(this.image!=null){

      formData.append('image',this.image,this.image.name)
    }
    this.authService.signup(formData).subscribe(data=>{
      console.log('signup data ',data);
      if(data['data']){
        console.log("successful");
        this.router.navigate(['/'])

      }
      
    })
  }
}
