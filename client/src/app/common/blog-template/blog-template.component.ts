import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-template',
  templateUrl: './blog-template.component.html',
  styleUrls: ['./blog-template.component.scss']
})
export class BlogTemplateComponent implements OnInit {
@Input() blogs
@Input() length

  constructor() { }

  ngOnInit(): void {
  }

}
