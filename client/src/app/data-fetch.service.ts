import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn:"root"})
export class DataFetchService{
    constructor(private http:HttpClient){}
    getHomeData(){
        return this.http.get("http://localhost:8080")
    }
    createBlog(details){
       return this.http.post('http://localhost:8080/create/blog',details)

    }
    getCatagoryBlogData(id){
        return this.http.get('http://localhost:8080/catagory/'+id)
    }
    getBlog(id){
        return this.http.get('http://localhost:8080/blog/'+id)
    }
    getComments(blogId){
        console.log('blogID',blogId);
        
        return this.http.get('http://localhost:8080/get-comments/'+blogId)
    }
    blogComment(blogId,userId,comment){
        return this.http.post('http://localhost:8080/create/comment',{blogId,userId,comment})
    }
    getBlogs(){
        return this.http.get('http://localhost')
    }
    search(text){
        return this.http.get('http://localhost:8080/search/'+text)
    }
}