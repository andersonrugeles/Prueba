const express= require('express');
const router= express.Router();
const pool=require('../database');


router.get('/register',async(req,res)=>{
    res.render('index/register');
});

router.post('/register',async(req,res)=>{
    const {usuario,password}=req.body;
    const agregar={usuario,password};
    const result=await pool.query('insert into contacto set ?',[agregar]);
    req.flash('success','Contacto agregado exitosamente');
    res.redirect('../agrega');
 });




module.exports=router;