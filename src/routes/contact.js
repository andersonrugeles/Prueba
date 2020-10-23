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
router.post('/delete/:id_contacto',estalogueado,async(req,res)=>{
    const {id_contacto}=req.params;
    await pool.query('delete from contacto where id_contacto = ?',[id_contacto]);
    req.flash('success','Contacto Eliminado Correctamente');
    res.redirect('../sesion');
});

router.post('/agregar_contacto',estalogueado,async(req,res)=>{
    const {nombre,apellido,email,numero_contacto}=req.body;
    const fk_id_usuario=req.user.id_usuario;
    const agregar={fk_id_usuario,nombre,apellido,email,numero_contacto};
    const result=await pool.query('insert into contacto set ?',[agregar]);
    req.flash('success','Contacto agregado exitosamente');
    res.redirect('../sesion');
});
 module.exports=router;