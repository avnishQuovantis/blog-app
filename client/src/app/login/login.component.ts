import { Component, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
@ViewChild('loginForm') login
message=''
  constructor(private authService:AuthService,private route:Router) {
    
   }

  ngOnInit(): void {
  }
  loginSubmit(){
    console.log(this.login);
    
    const email=this.login.value.email
    const password=this.login.value.password
    this.authService.login(email,password).subscribe(data=>{
      console.log("login data ",data);
      if(data['data']!=null){

        this.authService.user.next(data['data'])
        this.route.navigate(['/'])
      }else{
      this.message=data['message']
      }
    })
  }

}
