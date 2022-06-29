import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFetchService } from '../data-fetch.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  blogs=[]
  constructor(private dataFetch:DataFetchService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      console.log('insidde search ',params['id']);
      this.dataFetch.search(params['id']).subscribe(search=>{
        console.log(search);
        this.blogs=search['data']
      })
    })
  }

}
