import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataFetchService } from '../data-fetch.service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
user
searchInput=""
@Output() dropDownBtn=false
constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.user.subscribe(data=>{
      console.log('user in heading ',data);
      this.user=data
      
    })
  }

  clickDropDown(){
    console.log('click on drop down',this.dropDownBtn);
    
    this.dropDownBtn=!this.dropDownBtn
  }
  search(){
    console.log('search ',this.searchInput)
    this.router.navigate(['/search/',this.searchInput])
  }
}
