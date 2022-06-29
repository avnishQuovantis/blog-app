import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { BlogSevice } from 'src/app/blog/blog.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
@Input() dropDown:boolean
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  clickMenu(menu){
    if(menu=='signout')
    this.authService.user.next(null)
    else if(menu=='profile'){
      this.router.navigate(['/user/profile'])
    }
    else{
     this.router.navigate(['/create-blog'])
   }
   this.dropDown=false
  }
}
