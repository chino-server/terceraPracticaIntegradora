import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
//import FileStore from "session-file-store";
import handlebars from 'express-handlebars'
import { __dirname } from "./utils/utils.js";
import viewsRouter from './routes/views.router.js'
import userRouter from './routes/user.router.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import current from './routes/sessions.router.js'
import './DAL/MongoDB/dbConfig.js'
import MongoStore from "connect-mongo";
import passport from "passport";
import "./middleware/passport/passportStrategie.js"
import config from "./config.js";

const app = express ()
const port = config.port

app.use (express.json())
app.use (express.urlencoded({extended:true}))

//archivo estaticos
app.use(express.static(__dirname + '../../public'))

//Configuracion de motor de plantilla
app.engine('handlebars', handlebars.engine({
    partialsDir: __dirname + '../../views/partials',
}))
app.set('views', __dirname + '../../views')
app.set('view engine', 'handlebars')

//Cookie 
app.use (cookieParser ())

//FileStore
//const fileStore = FileStore (session)

//Session
app.use(session({
    store: new MongoStore ({
        mongoUrl: config.mongo_uri
    }),
    secret: 'secretKey',
    cookie:{
        maxAge:100000
    }
}))

//Passport
app.use (passport.initialize())
app.use (passport.session())


//Routes
app.use ('/', viewsRouter)
app.use ('/users', userRouter)
app.use('/api', productsRouter)
app.use('/api', cartsRouter)
app.use ('/current', current)



app.listen (port, ()=>{
    console.log('Servidor escuchando');
})