// here we are using express to create server 
// express main server creation is not required wo apne aap ho jata hai and express also uses http internally to create server
const express=require('express');
const app=express()// express ke andar bahut saree tools hote hain jaise hi express call karte hain wo saree tools app main aajayene and kuch bhi use krna ho to app ke through hii use kr sakte hain
const morgan=require('morgan')//  third party  middleware
const dbconnection=require('./config/db')
const usermodel=require('./models/user')

// no need to call require function for using ejs
app.set("view engine",'ejs')


// middlewares- jab bhi koi route call hoga to uske pehle ye call hoga it's like a middle man jo actual route call hone se pehle agar koi kaam karana ho to wo ismain kara sakte hain 
// 3 types- built in , custom , third party 

// USING MORGAN - this will give insights like kis type ki request hai ,kab aayi , kya method use hua , kitna time liya etc

app.use(morgan('dev'))

// built in middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))// the folder in which css file is there we have to mention that name

// CUSTOM   
// we have to pass 3 parameters req,res,next next is where the function will go after execution means on which route it will go
// app.use((req,res,next)=>{
//     const a=2
//     const b=3
//     console.log(a+b)
//     console.log('custom middleware')
//     return next() // jo bhi route pe jana tha wahan pe chala jayega ab
// })

// all three types of middleware will run for every routes by default 
// we can create custom middleware for routes


// creating routes and creating middle ware only for / 
//  app.get('/',(req,res,next)=>{
//     const a=2
//     const b=3
//     console.log(a+b)
//     next()
//  },(req,res)=>{
//     res.render('index')
//  })

//                                           method 1 of routes is get method
// used for sending data from server to front-end 
app.get('/',(req,res)=>{
   res.render('index')
})
 app.get('/about',(req,res)=>{
    res.send('this is about page')
 })

 app.get('/register',(req,res)=>{
   res.render('register')
 })

 // R--------------reading from database
 app.get('/get-users',(req,res)=>{
   usermodel.find().then((user)=>{
      res.send(user)
   })
 })

// U--------------updating database
app.get('/update-user',async (req,res)=>{

   await usermodel.findOneAndUpdate(
      {
         Username:'abhi'
      },
      {
         Email:"abhi28@gmail.com"
      }
   )
   res.send('user updated')
})

//D---------------deleting user from database
app.get('/delete-user',async (req,res)=>{

   await usermodel.findOneAndDelete(
      {
         Username:'roy'
      }
   )
   res.send('user deleted')
})
//                                                   method -2 is post method
// used for sending data from front-end to back-end 
app.post('/getformdata',(req,res)=>{
   console.log(req.body)
   res.send('data received')
})


// C----------creating database
// async ka use isliye kiya hai bec  jabtak database main new user create  nahi hoga program agge nahi badhega ,it will wait
app.post('/register',async (req,res)=>{
   //console.log(req.body)
   const {username,email,password}=req.body  // here we have done destructuring for extracting data 
   await usermodel.create({
      Username:username,
      Email:email,
      Password:password
   })
   res.send('user registered')
})


 app.listen(3000)