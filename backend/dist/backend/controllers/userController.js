"use strict";
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
exports.updateUser = exports.postUser = exports.deleteOneUser = exports.getOneUser = exports.getOneUserByEmail = exports.getUsers = void 0;
const users_js_1 = __importDefault(require("../../src/app/model/users.js"));
//para usar estas funciones, hay que añadirlas al module.export
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    users_js_1.default.find()
        .then((respuesta) => {
        res.status(200).json(respuesta);
    })
        .catch((error) => {
        res.status(500).json({
            message: 'Ocurrió un error en la función GetUsers',
            error: error.message
        });
    });
});
exports.getUsers = getUsers;
const getOneUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    users_js_1.default
        .findOne({ email })
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});
exports.getOneUserByEmail = getOneUserByEmail;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    users_js_1.default
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});
exports.getOneUser = getOneUser;
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
    const { name, username, surname, email, role } = req.body;
    users_js_1.default
        .updateOne({ _id: id }, { $set: { name, username, surname, email, role } }) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data) => res.json(data))
        .catch((error) => res.json({
        mensaje: error
    }));
};
exports.updateUser = updateUser;
module.exports = {
    updateUser: exports.updateUser, getOneUser: exports.getOneUser, deleteOneUser: exports.deleteOneUser, postUser: exports.postUser, getUsers: exports.getUsers, getOneUserByEmail: exports.getOneUserByEmail
};
