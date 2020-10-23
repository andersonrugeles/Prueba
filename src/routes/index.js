const express= require('express');
const router= express.Router();
const pool=require('../database');

router.get('/index',async(req,res)=>{
        res.render('index/inicio');
});
router.get('/register',async(req,res)=>{
    res.render('index/register');
});


router.post('/index',async(req,res)=>{
    
    const {nombre,apellido,email,asunto,mensaje}=req.body;
    const newenvio={nombre,apellido,email,asunto,mensaje};
    
await pool.query('insert into roles set ?',[newenvio]);
   res.redirect('/index');
    
});
router.get('/delete/:rol_id',async(req,res)=>{
const {rol_id}=req.params;
const envio= await pool.query('delete from roles where rol_id=?',[rol_id]);
res.redirect('/index');
});

router.post('/modificar/:rol_id',async(req,res)=>{
    const {rol_id}=req.params;
    const envio=await pool.query('select * from roles where rol_id=?',[rol_id]);
    res.render('/index/modificar',{index : rol_id[0]});
    });

module.exports=router;