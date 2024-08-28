const express = require('express');
const app = express()

const hbs = require('hbs')
const nocache = require('nocache')
const session = require('express-session')

const router=require('./Routes/userRoute')

app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }))

  app.use(nocache())
  app.use('/',router)


app.set('view engine','hbs')
app.set('views',__dirname+'/views')




app.listen(8080,()=>{
    console.log('listening in the port 8080')
})
