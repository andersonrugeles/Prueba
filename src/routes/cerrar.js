const express = require('express');
const router= express.Router();


router.get('/cerrarsesion',(req,res)=>{
    req.logOut();
    res.redirect('/index');
});



module.exports=router;