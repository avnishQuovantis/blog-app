import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http"
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeadingComponent } from './heading/heading.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ShortendPipe } from './shortend.pipe';
import { CatagoryBlogComponent } from './catagory-blog/catagory-blog.component';
import { BlogComponent } from './blog/blog.component';
import { DropdownComponent } from './common/dropdown/dropdown.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { BlogTemplateComponent } from './common/blog-template/blog-template.component';

const routes = [
  {
    path: "",
    pathmatch: "fullpath",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },{
    path:"create-blog",
    component:CreateBlogComponent
  },
  {path:"catagory/:id",component:CatagoryBlogComponent},
  {path:'blog/:id',component:BlogComponent},{path:"user/profile",component:ProfileComponent},
  {
    path:"search/:id",component:SearchComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeadingComponent,
    LoginComponent,
    SignupComponent,
    CreateBlogComponent,
    ShortendPipe,
    CatagoryBlogComponent,
    BlogComponent,
    DropdownComponent,
    ProfileComponent,
    SearchComponent,
    BlogTemplateComponent,
  

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
