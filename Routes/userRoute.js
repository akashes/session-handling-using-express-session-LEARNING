


const express = require('express');
const router=express.Router()

const userName = 'admin'
const userPassword = 'admin123'


router.get('/',(req,res)=>{
    res.send('server running')
    
})



router.get('/login',(req,res)=>{
    if(req.session.user){
        res.render('home')
    }
else{
    if(req.session.passwordWrong){
        res.render('Login',{msg:'Invalid Credentials'})
    }else{

        res.render('Login')
    }

}

})
router.post('/form-submit',(req,res)=>{
    console.log('inside form submission')


    const{username,password}=req.body
    console.log(username,password)
    if(req.body.username===userName&& req.body.password===userPassword){
        // res.render('home')
        req.session.user=req.body.username
        req.session.save()
        res.redirect('/home')

    }else{
        req.session.passwordWrong=true
res.redirect('/home')
    }
    
})

router.get('/home',(req,res)=>{
    if(req.session.user){
        console.log('existing user')
    
        res.render('home')
    }else{
        if(req.session.passwordWrong){

            req.session.passwordWrong=false
            res.render('login',{msg:"Invalid Credentials"})
        }else{
            res.render('Login')
        }
    }
        
})

router.get('/logout',(req,res)=>{
    console.log('inside logout')
    if(req.session.user){
        req.session.destroy()
        res.render('login')
    }else{
        res.render('login')
    }
})
module.exports=router