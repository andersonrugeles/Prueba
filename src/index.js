const express= require('express');
const morgan= require('morgan');
const exphbs= require('express-handlebars');
const path= require('path');
const flash=require('connect-flash');
//inicio
const app= express();

//configuraciones
app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers:require('./lib/handlebars')
}));
app.set('view engine','.hbs');

//peticiones

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//variables globales


//rutas
app.use(require('./routes'));




//public
app.use('/static',express.static(path.join(__dirname,'public')));

//inicia el server
app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'))
});