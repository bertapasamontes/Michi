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
exports.updateProduct = exports.postProduct = exports.deleteOneProduct = exports.getOneProduct = exports.getProducts = void 0;
const product_js_1 = __importDefault(require("../../src/app/model/product.js"));
//para usar estas funciones, hay que añadirlas al module.export
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    product_js_1.default.find()
        .then((respuesta) => {
        res.status(200).json(respuesta);
    })
        .catch((error) => {
        res.status(500).json({
            message: 'Ocurrió un error en la función getProducts',
            error: error.message
        });
    });
});
exports.getProducts = getProducts;
const getOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    product_js_1.default
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});
exports.getOneProduct = getOneProduct;
const deleteOneProduct = (req, res) => {
    const { id } = req.params;
    product_js_1.default
        .deleteOne({ _id: id }) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data) => res.json(data))
        .catch((error) => res.json({
        mensaje: error
    }));
};
exports.deleteOneProduct = deleteOneProduct;
const postProduct = (req, res) => {
    const sitio = new product_js_1.default(req.body);
    sitio
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({
        mensaje: error
    }));
};
exports.postProduct = postProduct;
const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, category, price, site, comments } = req.body;
    product_js_1.default
        .updateOne({ _id: id }, { $set: { name, category, price, site, comments } })
        .then((data) => res.json(data))
        .catch((error) => res.json({
        mensaje: error
    }));
};
exports.updateProduct = updateProduct;
module.exports = {
    updateProduct: exports.updateProduct, getOneProduct: exports.getOneProduct, deleteOneProduct: exports.deleteOneProduct, postProduct: exports.postProduct, getProducts: exports.getProducts
};
