import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogs-template',
  templateUrl: './blogs-template.component.html',
  styleUrls: ['./blogs-template.component.scss']
})
export class BlogsTemplateComponent implements OnInit {
@Input() blog
  constructor() { }

  ngOnInit(): void {
  }

}
