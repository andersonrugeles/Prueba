const express = require('express');
const router= express.Router();
const pool=require('../database');
const {estalogueado}=require('../lib/valida');

router.get('/sesion',estalogueado,async(req,res)=>{
    const muestra=await pool.query('select * from contacto where fk_id_usuario=?',[req.user.id_usuario]);
    res.render('index/index',{muestra});

});
 module.exports=router;