const express=require('express')
const path= require('path')
const fs= require('fs')
const app=express()
const port=80

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
    name = req.body.name
    phone = req.body.phone
    email = req.body.email
     address = req.body.address
    desc = req.body. desc


    // let dataToWrite=`The name of the client is ${name},${phone} years old, ${gender} , residing at ${address}.More about him/her: ${more}`
    let dataToWrite=`Client Data will be-
                     Name - ${name},
                     Mobile No. - ${phone},
                     Email-id - ${email},
                     Address- ${address},
                     Description - ${desc} `
                     //sending the form data in a new file form.txt
    fs.writeFileSync('form.txt',dataToWrite)
    
      const params={'message':'Your form has been submitted successfully'}
      res.status(200).render('index.pug',params)
})

//START THE SERVER
app.listen(port,()=>{
    console.log(`The application is running on port ${port}`)
})
