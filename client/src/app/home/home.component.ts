import { Component, OnInit } from '@angular/core';
import { DataFetchService } from '../data-fetch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  blogs:[]
  constructor(private dataFetchService:DataFetchService) { }

  ngOnInit(): void {
    this.dataFetchService.getHomeData().subscribe(data=>{
      console.log('blog ',data['data']);
      this.blogs=data['data']
    })
  }

}
