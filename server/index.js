const express=require('express')
const mongoose=require("mongoose")
const cors=require('cors')
const TodoModel=require('./Models/Todo')
const dotenv=require('dotenv')

dotenv.config();

const app=express()
app.use(cors({
    origin: ['https://todo-e0ceb.web.app'], // your Firebase Hosting URL
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}));

app.use(express.json())

const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log("Server is Running")
})

mongoose.connect(process.env.MONGO_URI)


app.post('/add',(req,res)=>{
    const task =req.body.task;
    TodoModel.create({
        task: task
    }).then(result =>res.json(result))
    .catch(err=> res.json(err))
     
})


app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id',(req,res)=>{
    const {id}=req.params
    TodoModel.findByIdAndUpdate({_id:id},{done:true})
    .then(result=>res.json(result))
    .catch(err => res.json(err))
})
app.delete('/delete/:id',(req,res)=>{
    const {id}=req.params
    TodoModel.findByIdAndDelete({_id:id})
    .then(result=>res.json(result))
    .catch(err => res.json(err))

})

