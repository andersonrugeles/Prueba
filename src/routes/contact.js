const express = require('express');
const router= express.Router();
const pool=require('../database');
const {estalogueado}=require('../lib/valida');

router.post('/modificar_contacto/:id_contacto',estalogueado,async(req,res)=>{
    const {id_contacto}=req.params;
    const {nombre,apellido,email,numero_contacto}=req.body;
    const actualizacontact={nombre,apellido,email,numero_contacto};
    const contact=await pool.query('UPDATE contacto set ? where id_contacto = ?',[req.body,id_contacto]);
    req.flash('success','Producto actualizado correctamente');
    res.redirect('../sesion');
});
 module.exports=router;