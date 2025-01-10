const mongoose=require('mongoose')

// mongodb://0.0.0.0 this means we are connecting to a database which is locally available
const connection=mongoose.connect('mongodb://0.0.0.0/sample-DB').then(()=>{
    console.log('database connected')
})
module.exports=connection // it is done so we can use this in other part of application

// Mongoose library, which is an Object Data Modeling (ODM) library for MongoDB and Node.js.
// It helps in managing relationships between data, provides schema validation, and translates between objects in code
//  and MongoDB documents.