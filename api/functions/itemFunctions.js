const mysql=require("mysql")
const path = require("path")
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"blog_app",
    password:"scott"
})

async function login(req,res){
    const {email,password}=req.body
    console.log('req b ody ',req.body);
    try{
        let query ="select users.name,users.email,users.username,users.image,users.bio,users.id from users WHERE email='"+email+"' AND password='"+password+"'"
         connection.query(query,function(err,result){
            if(err){
                console.log("inside login if error ",err.message);
              return  res.json({data:null,message:err.message})
            }
            // console.log("result of login ",result);
            if(result.length!=0){
                console.log('inside if result is not l0 ',result);
              return res.status(200).json({data:result[0],message:"login succesfully"})
            }else{
                console.log("invalid");
          return res.json({data:null,message:"invalid credentials"})      
            }
        })
    }catch(err){
        console.log('login error',err);

       return res.json({data:null,message:err.message})
    }
}
async function signup(req,res){
    try {
        let query=`select email from users where email='${req.body.email}'`
   
        connection.query(query, (err,result)=>{
            console.log("singup result ",result);
            if(err){
                console.log("if result is not");
                return res.json({data:null,message:err})
            }
            let obj={...req.body}
           delete obj.location
            if(req.file){
                console.log("if file is not attat");
                let fileLocation = path.resolve(__dirname, "../files/profiles" + req.file.filename)
                obj['image'] = req.file.filename
            }
            else{
                obj['image']='user-profile.jpg'
            }
            if(result.length==0 ){
                console.log('obj ');
                query=`insert into users SET ? `
        
                connection.query(query,obj,(err,result)=>{
                    console.log("result in signup ",result);
                    if(err){
                        console.log("error in if'",err.message);
                        return res.json({message:err.message})
                    }
                    console.log("result ",result);
                  return  res.json({data:true,message:"successfule"})
                })
            }else{
                console.log('else in signup');
              return  res.json({data:false,message:"user already exist"})
            }
        })
    } catch (error) {
        console.log('erre',error.message);
      return  res.json({data:false,message:error.message})
    }
}
async function homeBlogs(req,res){
    
    try{
        const q=`select users.username,users.id,blogs.catagory,blogs.title,blogs.image,blogs.content,blogs.id ,blogs.created_at from blogs left join users on users.id=blogs.user_id`
        connection.query(q,function(err,result){
            if(err){
                console.log("inside homeblogs");
               return res.json({data:null,message:err.message})
            }
            console.log('not error home blog');
           return res.json({data:result,message:''})
        })
    }catch(Err){
        console.log('error in home blog');
        res.json({data:null,message:err.message})

    }
}
async function createBlog(req,res){
    console.log('inside crete blog');
    try{
       console.log("create blog ",req.body);
       let blog={title:req.body.title,
        content:req.body.content,
        user_id:req.body.userId,catagory:req.body.catagory}
       if(req.file){
        console.log('file name of blgo' ,req.file.filename);
        blog['image']='http:localhost:8080/blog-image/'+req.file.filename
       }
       else if(req.body.imageUrl!=''){
        blog['image']=req.body.imageUrl
       }else{
        blog['image']=null
       }
       const q="insert into blogs SET ?"
       connection.query(q,blog,(err,result)=>{
        if(err){
            console.log('error in inserting blog ',err.message);
            return res.json({data:false,message:err.message})
        }
        res.json({data:blog,message:"stored  successufly"})
       })
       
    }catch(err){
        res.json({data:false,message:err.message})
    }
}
async function getCatagoryBlogs(req,res){
    try {
        const {id}=req.params
        const q=`select * from blogs where catagory='${id}'`;
        console.log('getcatagorgy blogs id',id);
        connection.query(q,(err,result)=>{
            if(err){
                return res.json({data:null,message:err})
            }
            console.log('get catagory blog resuult',result);
        
            res.json({data:result,message:"retrieve retrieve"})
        })
    } catch (error) {
        console.log('error in get catagor',error);
        return res.status(200).json({data:null,message:error.message})
    }
}

async function getBlog(req,res){
    try{
        const {id}=req.params
        const q=`select blogs.*,users.name,users.username,users.email ,users.image as userimage,users.bio  from blogs left join users on blogs.user_id=users.id where blogs.id='${id}'`;
        connection.query(q,(err,result)=>{
            if(err){
                return res.json({data:null,message:err.message})
            }
            
            res.json({data:result,message:""})

        })

    }catch(err){
        res.json({data:null,message:err.message})
    }
}
async function getProfileImage(req,res){
    try {
        const {id}=req.params;
        console.log("image location in get profile",id);
        res.sendFile(id, { root: path.join(__dirname, "../files/profiles") })
    } catch (error) {
        console.log(error);
        res.json({user:null})
        
    }
}
async function getComments(req,res){
    try {
        const {id}=req.params
        console.log('get comments id',id);
        const q=`select comments.id as commentId,users.username as username,users.id as userId,comments.comment_text, users.image ,comments.created_at ,users.id as userId from blogs left join comments on comments.blog_id=blogs.id join users on comments.user_id =users.id where blogs.id=${id};`
        connection.query(q,(err,result)=>{
            if(err){
                return res.json({data:null,message:err.message})
            }
            res.json({data:result,message:""})
        })
    } catch (error) {
        return res.json({data:null,message:error.message})
    }
}
async function createComment(req,res){
    try {
        const {userId,blogId,comment}=req.body
        let obj={
            user_id:userId,
            blog_id:blogId,
            comment_text:comment
        }
        const q=`insert into comments SET ?`
        connection.query(q,obj,(err,result)=>{
            if(err){
                console.log('comment err' ,err.message);
                return res.json({data:null,message:err.message})
            }
            let query=`select comments.id as commentId,users.username as username,users.id as userId,comments.comment_text, users.image ,comments.created_at ,users.id as userId from blogs left join comments on comments.blog_id=blogs.id join users on comments.user_id =users.id where blogs.id=${blogId};`
            connection.query(query,(err,result)=>{
                if(err){
                    return res.json({data:null,message:err.message})
                }

                res.json({data:result,message:'completed  '})
            })
        })
    } catch (error) {
        return res.json({data:null,message:error.message})

    }
}

async function getBlogImage(req,res){
    try {
        const {id}=req.params
        console.log('blod if ',id);
       return res.sendFile(id, { root: path.join(__dirname, "../files/blogs") })
    } catch (error) {
   return res.json({data:null,message:error.message})       
    }
}
async function searchBlog(req,res){
    try {
        const {id}=req.params
        let q=`select * from blogs where title like '%${id}%'`

        connection.query(q,(err,result)=>{
            
            if(err){
                console.log('inside search erro',err.message);
                return res.json({data:null,message:err})
            }
            console.log('data i search',result);
            res.json({data:result,message:""})
        })
    } catch (error) {
        console.log("search in catch,,",error.message);
        return res.json({data:null,message:error.message})
    }
}
module.exports={connection,searchBlog,getBlogImage,createComment,login,signup,getComments,getCatagoryBlogs,homeBlogs,createBlog,getBlog,getProfileImage}
