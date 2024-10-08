require('dotenv').config();
const express = require('express')
const app =  express();
const uri = process.env.Mongo_Uri
const port = process.env.PORT
const morgan = require('morgan')
const mongoose = require('mongoose');
const userRotues = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes');

app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json()) 

mongoose
.connect(uri)
.then(()=> console.log(`Database Conection SuccessFully...`))
.catch(err=>console.log(err))

app.use('/api/user',userRotues)
app.use('/api/product',productRoutes)

app.listen(port,()=>{
    console.log('server started at http://localhost:5050');
    
})