import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataFetchService } from '../data-fetch.service';
import { BlogSevice } from './blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogs = {}
  user:{}=null
  comment=""
  comments: []=[]
  constructor( private route: ActivatedRoute, private blogService: BlogSevice,private authService:AuthService) { }
  ngOnInit(): void {

    this.blogService.socket.on('getNewComments',(data)=>{
      console.log('new comments',data);
      this.comments=data['newComments']
    })
    this.route.params.subscribe(params => {
      this.authService.user.subscribe(data=>{
        this.user=data
      })
      this.blogService.getComments(params['id'])
      this.blogService.comments.subscribe(data=>{
        console.log('comments',data);
        this.comments=data
      })
      this.blogService.getBlog(params['id']).subscribe(data=>{
        console.log(data);
        if(data['data'].length!=0){
          this.blogs=data['data'][0]
        }
      })
      
    })
  }
  createComment(){
    console.log('click comment',this.blogs['id'],this.user['id'],this.comment);

  
    this.blogService.createComment(this.blogs['id'],this.user['id'],this.comment)
  }
}
