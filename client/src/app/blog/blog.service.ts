import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DataFetchService } from "../data-fetch.service";

@Injectable({ providedIn: "root" })
export class BlogSevice {
    socket = null
    comments = new BehaviorSubject<[]>([])
    constructor(private dataFetchService: DataFetchService) { }
    getBlog(id) {
        return this.dataFetchService.getBlog(id)
    }
    createComment(blogId, userId, comment) {
        return this.dataFetchService.blogComment(blogId, userId, comment).subscribe(data => {
            console.log('createdcoomment', data);
            if (data['data'] != null) {
                this.socket.emit('newComments',data['data'])
                this.comments.next(data['data'])
            }
        })
    }
    createBlog(formData) {
        return this.dataFetchService.createBlog(formData)

    }
    getComments(blogId) {
        console.log(blogId);

        return this.dataFetchService.getComments(blogId).subscribe(data => {
            console.log('comments', data);
            this.comments.next(data['data'])
        })
    }
    getBlogs() {
    }
}