const express= require('express');
const router= express.Router();
const pool=require('../database');
const passport=require('passport');

router.get('/register',async(req,res)=>{
    res.render('index/register');
});

router.post('/register',(req,res,next)=>{
    passport.authenticate('local.registro',{
    failureFlash: true,
    })(req,res,next);
    req.flash('success','Usuario regitrado exitosamente')
    res.redirect('../index');
    });
module.exports=router;