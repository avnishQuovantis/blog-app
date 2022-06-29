import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BlogSevice } from '../blog/blog.service';
import { DataFetchService } from '../data-fetch.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {

  constructor(private authService: AuthService, private blogService: BlogSevice, private router: Router) { }
  title = ""
  content = ""
  imageUrl = ""
  catagory = ''
  previewImage = ""
  user = null
  file = null
  error = ''
  openImage(event) {
    this.file = event.target.files[0]
    let reader = new FileReader()
    reader.onload = () => {
      this.previewImage = reader.result as string
      console.log("image as url ", reader.result as string);

    }
    reader.readAsDataURL(event.target.files[0])
  }
  ngOnInit(): void {
    this.authService.user.subscribe(data => {
      this.user = data
    })
  }
  submitBlog() {
    console.log(this.catagory);
    let formData = new FormData();
    formData.append('title', this.title)
    formData.append('content', this.content)
    formData.append('catagory', this.catagory)
    formData.append('userId', this.user['id'])
    formData.append('location', 'blog')
    if (this.imageUrl != '') {
      formData.append('imageUrl', this.imageUrl)
    } else if (this.file != null) {
      formData.append('image', this.file, this.file.name)
    }
    this.blogService.createBlog(formData).subscribe(data => {
      console.log(data);
      if (data['data']) {
          this.router.navigate(['/'])
      } else {
        this.error = data['message']
      }

    })
  }
  changeImageUrl(event) {
    console.log('image url is ', event.target.value);
    this.imageUrl = event.target.value
    this.previewImage = event.target.value
    // this.preview
  }

}
