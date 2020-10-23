const express= require('express');
const router= express.Router();
const passport=require('passport');
const {noestalogueado}=require('../lib/valida');


router.get('/index',(req,res)=>{

     res.render('index/inicio');
});


router.post('/index',noestalogueado,(req,res,next)=>{
    passport.authenticate('local.inicio',{
        successRedirect: '/sesion',
        failureRedirect: '/index/inicio',
        failureFlash: true
    })(req,res,next);
    });

module.exports=router;