const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const pool=require('../database');
const helpers=require('../lib/helpers');

passport.use('local.inicio',new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true
        },async(req,usuario,password,done) => {
          const rows=await pool.query('SELECT *  FROM usuarios WHERE usuario = ?', [usuario]);
          if(rows.length>0){
          const user=rows[0];
          const validacion=await helpers.matchPassword(password, user.password);
          console.log(user);
          if(validacion){
                 
                    done(null,user,req.flash('success','Bienvenido'));
                  
          }else{
              done(null,false,req.flash('message','Contraseña Incorrecta'));
          }
        }else{
            return done(null,false,req.flash('message','Usuario no existe'));
        }
    }));


passport.use('local.registra',new LocalStrategy({
usernameField: 'username',
passwordField: 'password',
passReqToCallback: true
}, async(req,username,password,done) => {
    const {nombre,correo}=req.body;
    const registrar={nombre,username,correo,password};
    registrar.password = await helpers.encryptPassword(password);
    const result=await pool.query('insert into registro set ?',[registrar]);
    registrar.idcliente=result.insertId;
     return done(null,registrar);
}));

passport.use('local.registro',new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true
    }, async(req,usuario,password,done) => {
       const registrar={usuario,password};
        registrar.password = await helpers.encryptPassword(password);
        const result=await pool.query('insert into usuarios set ?',[registrar]);
        registrar.idcliente=result.insertId;
         return done(null,registrar);
    }));

passport.serializeUser(async(user,done)=>{
 
        done(null,user.id_usuario);
    
});

passport.deserializeUser(async(id_usuario,done)=>{
 const rows= await pool.query(' SELECT * FROM usuarios where id_usuario= ?',[id_usuario]);
done(null,rows[0]);
});