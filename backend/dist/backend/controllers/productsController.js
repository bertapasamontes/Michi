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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.postProduct = exports.deleteOneProduct = exports.getOneProductWithTotalInfo = exports.getOneProduct = exports.getProductsWithoutPages = exports.getProducts = void 0;
const product_js_1 = require("../../src/app/model/product.js");
const pixabay_images_service_js_1 = require("../services/pixabayImages/pixabay-images.service.js");
const _pixabayImages = new pixabay_images_service_js_1.PixabayImagesService();
//para usar estas funciones, hay que añadirlas al module.export
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener los valores de la página y el límite de la consulta
        const page = parseInt(req.query.page) || 1; // Página actual (por defecto, página 1)
        const limit = parseInt(req.query.limit) || 5; // Cantidad de productos por página (por defecto, 5 productos por página)
        const skip = (page - 1) * limit; // Calcular los productos que hay que saltarse según la página
        const productos = yield product_js_1.ProductoNuevo.find()
            .skip(skip) // Saltar los productos según la página actual
            .limit(limit) // Limitar la cantidad de productos por página
            .populate({
            path: 'site',
            model: 'sitiosDeMichi',
            select: 'name'
        })
            .populate({
            path: 'comments',
            model: 'comentarios',
            select: 'text',
            populate: {
                path: 'user',
                model: 'UsersDeMichi',
                select: 'username'
            }
        });
        // Contar el total de productos para calcular las páginas
        const total = yield product_js_1.ProductoNuevo.countDocuments();
        res.status(200).json({
            data: productos,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Ocurrió un error en la función getProducts',
            error: error.message
        });
    }
});
exports.getProducts = getProducts;
const getProductsWithoutPages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    product_js_1.ProductoNuevo.find()
        .populate({
        path: 'site',
        model: 'sitiosDeMichi',
        select: 'name'
    })
        .populate({
        path: 'comments',
        model: 'comentarios',
        select: 'text',
        populate: {
            path: 'user',
            model: 'UsersDeMichi',
            select: 'username'
        }
    })
        .then((respuesta) => {
        res.status(200).json(respuesta);
    })
        .catch((error) => {
    });
});
exports.getProductsWithoutPages = getProductsWithoutPages;
const getOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    product_js_1.ProductoNuevo
        .findById(id)
        .populate({
        path: 'site',
        model: 'sitiosDeMichi',
        select: 'name'
    })
        .populate({
        path: 'comments',
        model: 'comentarios',
        select: 'text',
        populate: {
            path: 'user',
            model: 'UsersDeMichi',
            select: 'username'
        }
    })
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});
exports.getOneProduct = getOneProduct;
const getOneProductWithTotalInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const producto = yield product_js_1.ProductoNuevo.findById(id)
            .populate({
            path: 'site',
            model: 'sitiosDeMichi',
            select: '-_v'
        })
            .populate({
            path: 'comments',
            model: 'comentarios',
            select: 'text user rating createdAt',
            populate: {
                path: 'user',
                model: 'UsersDeMichi',
                select: 'username imgProfile'
            }
        });
        if (!producto) {
            res.status(404).json({ mensaje: "Producto no encontrado" });
            return;
        }
        res.status(200).json(producto);
    }
    catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el producto", error: error });
    }
});
exports.getOneProductWithTotalInfo = getOneProductWithTotalInfo;
const deleteOneProduct = (req, res) => {
    const { id } = req.params;
    product_js_1.ProductoNuevo
        .deleteOne({ _id: id }) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data) => res.json(data))
        .catch((error) => res.json({
        mensaje: error
    }));
};
exports.deleteOneProduct = deleteOneProduct;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, category, price, site, rate, comments } = req.body;
        const imgProduct = yield _pixabayImages.getImageFromPixabay(name);
        console.log("imgProduct: ", imgProduct);
        if (!imgProduct || imgProduct.trim() === '') {
            res.status(400).json({ mensaje: 'No se pudo obtener una URL de imagen válida' });
        }
        const producto = new product_js_1.ProductoNuevo({
            name, category, price, site, rate, comments, imgProduct
        });
        try {
            console.log("Producto a guardar:", producto);
            const productoGuardado = yield producto.save();
            res.json({ data: productoGuardado, mensaje: 'Producto guardado' });
        }
        catch (error) {
            res.status(500).json({ mensaje: "Error al crear el producto", error: error });
        }
        // res.status(200).json(producto);
    }
    catch (error) {
        res.status(500).json({ mensaje: "Error en postProduct", error: error });
    }
});
exports.postProduct = postProduct;
const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, category, price, site, comments, rate, imgProduct } = req.body;
    product_js_1.ProductoNuevo
        .updateOne({ _id: id }, { $set: { name, category, price, site, comments, rate, imgProduct } })
        .then((data) => res.json(data))
        .catch((error) => res.json({
        mensaje: error
    }));
};
exports.updateProduct = updateProduct;
// module.exports = {
//     updateProduct, getOneProduct, deleteOneProduct, postProduct, getProducts
// }
