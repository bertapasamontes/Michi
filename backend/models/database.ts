import * as dotenv from "dotenv";
import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { environment } from "../env";

//importamos la ruta de usuarios
import routeUsers from '../routes/userRoutes'
import routePlaces from '../routes/placesRoutes'
import routeEvents from '../routes/eventsRoutes'
import routeProducts from '../routes/productsRoutes'
import routeComments from '../routes/commentsRoutes'

class Database{

    private app: Application;
    private port: string;

    constructor(){
        this.app = express();

        this.port = environment.PORT || '3001';
        this.listen();

        this.midlewares(); //siempre antes de los routes, si no, no funciona. Sin esto, hacer posts de users no funciona
        this.routes();

        this.dbConnect();
    }

    listen(){       
        this.app.listen(this.port, ()=>{
            console.log(`🚀 Servidor en http://localhost:${this.port}`);
        })
    }

    routes(){
        this.app.use('/api/usuario', routeUsers); //cuando mi url sea "localhost:puerto/api/users" y el verbo sea get, ejecutamos el trozo de codigo de getUsers
        this.app.use('/api/map', routePlaces);
        this.app.use('/api/calendar', routeEvents); 
        this.app.use('/api/producto', routeProducts);
        this.app.use('/api/comentario', routeComments);

    }

    midlewares(){
        //parseamos el body. sin esto, no puede leer lo que contiene en un form
        this.app.use(express.json());
        
        this.app.use(express.urlencoded({ extended: true }));

        //cors
        this.app.use(cors());

    }

    dbConnect(){
        // Conectar a MongoDB Atlas
        mongoose.connect(environment.MONGODB_URL)//para acceder a .env debemos poner antes "process"
        .then(() => console.log("🟢 Conectado a MongoDB Atlas"))
        .catch(err => console.error("🔴 Error al conectar MongoDB:", err));
    }
}

export default Database;

