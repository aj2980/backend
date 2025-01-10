// server creation
const http=require('http')
// server creation
const server=http.createServer((req,res)=>{
    //res.end('hello aj ')
    
    // creating routes 
    if(req.url=="/about")
    {
        res.end('you are on about page')
    }
    if(req.url=="/profile")
        {
            res.end('you are on profile page')
        }
        if(req.url=="/")
            {
                res.end('you are on home page')
            }
})
//server calling
server.listen(3000)