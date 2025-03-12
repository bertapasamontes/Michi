"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneFav = exports.saveFav = exports.getUserByEmail = exports.getOneUserByEmail = exports.getUsers = exports.postUser = exports.deleteOneUser = exports.getOneUser = exports.updateUser = void 0;
const users_js_1 = __importDefault(require("../../src/app/model/users.js"));
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
//para usar estas funciones, hay que añadirlas al export
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Config para paginas y limites de items:
        const page = parseInt(req.query.page) || 1; // Página actual (por defecto, página 1)
        const limit = parseInt(req.query.limit) || 5; // Cantidad de productos por página (por defecto, 5 productos por página)
        const skip = (page - 1) * limit; // Calcular los productos que hay que saltarse según la página
        const usuarios = yield users_js_1.default.find()
            .skip(skip)
            .limit(limit);
        // Contar el total de productos para calcular las páginas
        const total = yield users_js_1.default.countDocuments();
        res.status(200).json({
            data: usuarios,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Ocurrió un error en la función GetUsers',
            error: error
        });
    }
});
exports.getUsers = getUsers;
const getOneUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const usuarioDB = yield users_js_1.default.findOne({ email });
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                error: { message: 'User no encontrado' }
            });
        }
        const passwordCorrecto = yield bcrypt.compare(password, usuarioDB.password);
        if (!passwordCorrecto) {
            return res.status(400).json({
                ok: false,
                error: { message: "Usuario o contraseña incorrectos" }
            });
        }
        const secret = "secreto";
        // const experiesIn = '7d';
        const tokenDelUser = jwt.sign(// Generar token de autenticación
        { id: usuarioDB._id, email: usuarioDB.email }, // Solo almacenamos el ID
        secret, { expiresIn: '7d' });
        if (tokenDelUser) {
            console.log("tokenDelUser:", tokenDelUser);
        }
        return res.json({ ok: true, usuario: usuarioDB, tokenDelUser });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Error de autenticación',
            error: error
        });
    }
});
exports.getOneUserByEmail = getOneUserByEmail;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    users_js_1.default
        .findById(id)
        .populate({
        path: 'misFavs',
        model: 'productos',
        select: '_v'
    })
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});
exports.getOneUser = getOneUser;
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    users_js_1.default
        .findOne({ email })
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});
exports.getUserByEmail = getUserByEmail;
const deleteOneUser = (req, res) => {
    const { id } = req.params;
    users_js_1.default
        .deleteOne({ _id: id }) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data) => res.json(data))
        .catch((error) => res.json({
        mensaje: error
    }));
};
exports.deleteOneUser = deleteOneUser;
const postUser = (req, res) => {
    const user = new users_js_1.default(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({
        mensaje: error
    }));
};
exports.postUser = postUser;
const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, username, email, role, imgProfile, comments } = req.body;
    users_js_1.default
        .updateOne({ _id: id }, { $set: { name, username, email, role, imgProfile, comments } }) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email..).
        .then((data) => res.json(data))
        .catch((error) => res.json({
        mensaje: error
    }));
};
exports.updateUser = updateUser;
//guardar fav
const saveFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUser } = req.params; //id del usuario logueado
        const { idProducto } = req.body; //id del producto
        console.log("id desde backend: ", idUser);
        const user = yield users_js_1.default.findById(idUser);
        if (!user)
            return res.status(404).json({ message: 'Usuario no encontrado' });
        if (!user.misFavs.includes(idProducto)) {
            user.misFavs.push(idProducto);
            yield user.save();
        }
        return res.json({ message: 'Producto guardado', misFavs: user.misFavs });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al guardar producto', error });
    }
});
exports.saveFav = saveFav;
const deleteOneFav = (req, res) => {
    const { idUser, idProducto } = req.params; //obtenemos id del user y del producto
    users_js_1.default.updateOne({ _id: idUser }, //buscamos el user por su id
    { $pull: { misFavs: idProducto } } //$pull elimina solo un item especifico de un doc. le pasamos el id del producto dentro de misFavs.
    )
        .then((data) => res.json({ mensaje: "Producto eliminado de favoritos", data }))
        .catch((error) => res.status(500).json({ mensaje: error }));
};
exports.deleteOneFav = deleteOneFav;
