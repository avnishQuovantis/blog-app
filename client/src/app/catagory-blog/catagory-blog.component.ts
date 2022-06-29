import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFetchService } from '../data-fetch.service';

@Component({
  selector: 'app-catagory-blog',
  templateUrl: './catagory-blog.component.html',
  styleUrls: ['./catagory-blog.component.scss']
})
export class CatagoryBlogComponent implements OnInit {
  blogs=[]
  constructor(private dataFetchService:DataFetchService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.dataFetchService.getCatagoryBlogData(param['id']).subscribe(data=>{
        console.log('data',data);
        if(data['data']){
          this.blogs=data['data']
        }

      })
    
    })

  }

}
