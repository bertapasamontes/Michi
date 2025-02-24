"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cors_1 = require("cors");
//importamos la ruta de usuarios
var userRoutes_1 = require("../routes/userRoutes");
var Database = /** @class */ (function () {
    function Database() {
        this.app = (0, express_1.default)();
        this.port = process.env['PORT'] || '3000';
        this.listen();
        this.midlewares(); //siempre antes de los routes, si no, no funciona. Sin esto, hacer posts de users no funciona
        this.routes();
        this.dbConnect();
    }
    Database.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("\uD83D\uDE80 Servidor en http://localhost:".concat(_this.port));
        });
    };
    Database.prototype.routes = function () {
        this.app.use('/api/usuario', userRoutes_1.default); //cuando mi url sea "localhost:puerto/api/users" y el verbo sea get, ejecutamos el trozo de codigo de getUsers
    };
    Database.prototype.midlewares = function () {
        //parseamos el body
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        //cors
        this.app.use((0, cors_1.default)());
    };
    Database.prototype.dbConnect = function () {
        // console.log("🔍 URI de MongoDB:", process.env.MONGODB_URL);
        // Conectar a MongoDB Atlas
        mongoose_1.default.connect("mongodb+srv://admin:admin@cluster0.ve2kx.mongodb.net/DatabaseMichi?retryWrites=true&w=majority&appName=Cluster0") //para acceder a .env debemos poner antes "process"
            .then(function () { return console.log("🟢 Conectado a MongoDB Atlas"); })
            .catch(function (err) { return console.error("🔴 Error al conectar MongoDB:", err); });
    };
    return Database;
}());
exports.default = Database;
