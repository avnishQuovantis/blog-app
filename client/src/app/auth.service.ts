import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, tap } from "rxjs";

@Injectable({providedIn:"root"})
export class AuthService{
    user=new BehaviorSubject<any>(null);
        constructor(private http:HttpClient){}
    login(email:String,password:String){
        return this.http.post("http://localhost:8080/login",{email,password});
    }
    signup(formData){
        return this.http.post("http://localhost:8080/signup",formData)
    }
    
}