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
exports.updateComment = exports.postComment = exports.deleteOneComment = exports.getOneComment = exports.getComments = void 0;
const comments_js_1 = __importDefault(require("../../src/app/model/comments.js"));
const product_js_1 = require("../../src/app/model/product.js");
//para usar estas funciones, hay que añadirlas al module.export
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    comments_js_1.default.find()
        .then((respuesta) => {
        res.status(200).json(respuesta);
    })
        .catch((error) => {
        res.status(500).json({
            message: 'Ocurrió un error en la función getComments',
            error: error.message
        });
    });
});
exports.getComments = getComments;
const getOneComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    comments_js_1.default
        .findById(id)
        .populate({
        path: 'user',
        model: 'UsersDeMichi',
        select: '-_v',
    })
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});
exports.getOneComment = getOneComment;
const deleteOneComment = (req, res) => {
    const { id } = req.params;
    comments_js_1.default
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({
        mensaje: error
    }));
};
exports.deleteOneComment = deleteOneComment;
const postComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idProducto } = req.params;
        const { user, text } = req.body;
        //creamos nuevo comentario
        const nuevoComment = new comments_js_1.default({ user, text });
        yield nuevoComment.save();
        //lo añadimos al producto al que hace referencia
        const producto = yield product_js_1.ProductoNuevo.findById(idProducto); //cogemos el producto
        if (!producto) { //miramos si existe
            console.log("NO EXISTE ESTE PRODUCTO");
        }
        producto === null || producto === void 0 ? void 0 : producto.comments.push(nuevoComment._id); //añadimos el id del comentario en el array comentarios del producto
        yield (producto === null || producto === void 0 ? void 0 : producto.save()); //guardamos
        res.status(201).json({ mensaje: "Comentario agregado correctamente", producto });
    }
    catch (error) {
        res.status(500).json({ mensaje: "El comentario no se ha podido agregar al producto", error: error });
    }
});
exports.postComment = postComment;
// export const postComment = (req:Request, res: Response)=>{
//     const sitio = new comentarioNuevo(req.body);
//     sitio
//         .save()
//         .then((data)=> res.json(data))
//         .catch((error)=> res.json({
//             mensaje: error
//         }))
// }
const updateComment = (req, res) => {
    const { id } = req.params;
    const { name, category, price, site, comments } = req.body;
    comments_js_1.default
        .updateOne({ _id: id }, { $set: { name, category, price, site, comments } })
        .then((data) => res.json(data))
        .catch((error) => res.json({
        mensaje: error
    }));
};
exports.updateComment = updateComment;
module.exports = {
    getOneComment: exports.getOneComment, deleteOneComment: exports.deleteOneComment, postComment: exports.postComment, getComments: exports.getComments, updateComment: exports.updateComment
};
