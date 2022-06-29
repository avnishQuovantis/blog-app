const express=require('express')
const cors=require('cors')
const app=express()
const socketIo=require('socket.io')
const bodyParser=require("body-parser")
const http=require('http')
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
const multer = require("multer")
const path = require("path")
const {upload, blogImage}=require('./functions/storeImage')
const {connection,homeBlogs,login,signup,getBlogs, createBlog, getCatagoryBlogs, getBlog, getProfileImage, getComments, createComment, getBlogImage, searchBlog}=require("./functions/itemFunctions")





app.get("",homeBlogs)
app.post('/login',login)
app.post('/signup',upload.single('image'),signup)
app.get('/catagory/:id',getCatagoryBlogs)
app.get('/blog/:id',getBlog)
app.get('/profile/image/:id',getProfileImage)
app.get('/get-comments/:id',getComments)
app.get('/blog-image/:id',getBlogImage)
app.get('/search/:id',searchBlog)
app.post('/create/blog',upload.single('image'),createBlog)
app.post('/create/comment',createComment)
const server=http.createServer(app)

 const io=socketIo(server, {
    cors: {
      origin: '*',
    }
  })
server.listen(8080,()=>{
    console.log('connected');
    
})
io.on('connection',(socket)=>{

    socket.on('join',async({user})=>{
        console.log('join to socket ');
        socket.emit('welcome',{message:"welcome"})
        socket.on('newComments',(newComments)=>{
            socket.broadcast.emit('getNewComments',{newComments})
        })
    })
})
