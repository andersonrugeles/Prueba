const { json } = require('express');
const express= require('express');
const router= express.Router();
const pool=require('../database');

router.get('/remember',async(req,res)=>{
    res.render('forgot/forgot');
});

router.post('/remember',async(req,res)=>{
    const {usuario}=req.body;
    const muestra=await pool.query('select * from usuarios where usuario=?',[usuario]);
    const usuarios=Array.from(muestra);
    if(usuarios.length>0){
        res.render('forgot/update',{muestra});
    }else{
        req.flash('message','Usuario no encontrado');
        res.redirect('/remember');
    } 
 });
 router.post('/modificar_usuario/:id_usuario',async(req,res)=>{
    console.log('entrando');
    const {id_usuario}=req.params;
    const {usuario,password}=req.body;
    const actualizaUsuario={usuario,password};
    const contact=await pool.query('UPDATE usuarios set ? where id_usuario= ?',[req.body,id_usuario]);
    req.flash('success','Usuario actualizado correctamente');
    res.redirect('../index');
});
module.exports=router;