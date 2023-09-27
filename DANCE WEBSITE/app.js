const express=require('express')
const path= require('path')
const fs= require('fs')
const { default: mongoose } = require('mongoose')
const app=express()
const port=80
const bodyparser= require('body-parser')
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser:true});

//Defining mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  email: String,
  desc: String,
});

var Contact= mongoose.model('Contact',contactSchema);

//EXPRESS STUFF
app.use(express.static('static'))//serving static files
app.use(express.urlencoded())

//PUG STUFF
app.set('view engine','pug') //set template engine as pug
app.set('views',path.join(__dirname,'views')) //set the views directory

//ENDPOINTS
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params)

})

app.get('/contact',(req,res)=>{
    const params={'message':'Your form has been submitted successfully'}
    res.status(200).render('contact.pug',params)

})
app.post('/contact',(req,res)=>{
       var myData = new Contact(req.body);
       myData.save().then(()=>{
       res.send("This item has been saved to the database")
       }).catch(()=>{
       res.status(400).send("item was not saved to the databse")
    })
    


})




//START THE SERVER
app.listen(port,()=>{
    console.log(`The application is running on port ${port}`)
})

 
