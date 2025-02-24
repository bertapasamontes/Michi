"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("../env");
//importamos la ruta de usuarios
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const placesRoutes_1 = __importDefault(require("../routes/placesRoutes"));
const eventsRoutes_1 = __importDefault(require("../routes/eventsRoutes"));
class Database {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = env_1.environment.PORT || '3000';
        this.listen();
        this.midlewares(); //siempre antes de los routes, si no, no funciona. Sin esto, hacer posts de users no funciona
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Servidor en http://localhost:${this.port}`);
        });
    }
    routes() {
        this.app.use('/api/usuario', userRoutes_1.default); //cuando mi url sea "localhost:puerto/api/users" y el verbo sea get, ejecutamos el trozo de codigo de getUsers
        this.app.use('/api/map', placesRoutes_1.default); //cuando mi url sea "localhost:puerto/api/map" y el verbo sea get, ejecutamos el trozo de codigo de getUsers
        this.app.use('/api/calendar', eventsRoutes_1.default); //cuando mi url sea "localhost:puerto/api/calendar" y el verbo sea get, ejecutamos el trozo de codigo de getUsers
    }
    midlewares() {
        //parseamos el body
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        //cors
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        // Conectar a MongoDB Atlas
        mongoose_1.default.connect(env_1.environment.MONGODB_URL) //para acceder a .env debemos poner antes "process"
            .then(() => console.log("🟢 Conectado a MongoDB Atlas"))
            .catch(err => console.error("🔴 Error al conectar MongoDB:", err));
    }
}
exports.default = Database;
