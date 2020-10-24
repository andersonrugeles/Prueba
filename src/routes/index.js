const express= require('express');
const router= express.Router();
const passport=require('passport');
const {noestalogueado}=require('../lib/valida');


router.get('/index',(req,res)=>{

     res.render('iniciasesion/login');
});
router.get('/add',(req,res)=>{

    res.render('index/adduser');
});

router.post('/index',noestalogueado,(req,res,next)=>{
    passport.authenticate('local.inicio',{
        successRedirect: '/sesion',
        failureRedirect: '/iniciasesion/login',
        failureFlash: true
    })(req,res,next);
    });

module.exports=router;