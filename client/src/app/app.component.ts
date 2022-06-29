import { Component, OnInit } from '@angular/core';
import {io,Socket} from 'socket.io-client';
import { BlogSevice } from './blog/blog.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
socket:Socket
  constructor(private blogService:BlogSevice ){
  this.socket=io('http://localhost:8080')
    this.blogService.socket=this.socket
  }
  ngOnInit(){
    this.socket.emit('join',{user:null})
    this.socket.on('welcome',message=>{
      console.log('home ',message);
      
    })
    this.socket.on('newBlog',newBlog=>{

    })
  }
}
