const express = require('express');
const router= express.Router();
const {estalogueado}=require('../lib/valida');

router.get('/sesion',estalogueado,(req,res)=>{
   
    res.render('index/index');
 });
 module.exports=router;