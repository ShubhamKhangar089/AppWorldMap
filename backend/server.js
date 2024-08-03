require('dotenv').config()
const express = require('express');
const { connectToDB } = require('./src/config/db');
const { usersRouter } = require("./src/routes/userrouter");
const countryRouter = require('./src/routes/countryRouter');
const cors = require('cors');

const app= express();
app.use(express.json())
app.use(cors());

const port = process.env.PORT || 8080;
const url = process.env.URL

app.get('/home',(req,res)=>{
    try {
        res.status(200).json("this is home route")
    } catch (error) {
        res.status(500).json('error') 
    }
})

//userRouter
app.use('/users', usersRouter)

//countryRouter
app.use('/country', countryRouter)

app.listen(port,async()=>{
try {
    await connectToDB(url);
    console.log(`server running on ${port}`);   
} catch (error) {
    console.log('server not responding');
}
})