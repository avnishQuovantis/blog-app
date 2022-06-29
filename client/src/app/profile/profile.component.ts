import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
user={}
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    console.log('users in profile ',this.authService.user.getValue());
    if(this.authService.user.getValue()==null){
     this.router.navigate(['/'])
    }
    this.authService.user.subscribe(data=>{
      this.user=data
    })
    
  }

}
