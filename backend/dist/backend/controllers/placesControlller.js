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
exports.updateUser = exports.postPlace = exports.deleteOnePlace = exports.getOnePlace = exports.getPlaces = void 0;
const places_js_1 = __importDefault(require("../../src/app/model/places.js"));
//para usar estas funciones, hay que añadirlas al module.export
const getPlaces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    places_js_1.default.find()
        .then((respuesta) => {
        res.status(200).json(respuesta);
    })
        .catch((error) => {
        res.status(500).json({
            message: 'Ocurrió un error en la función getPlaces',
            error: error.message
        });
    });
});
exports.getPlaces = getPlaces;
const getOnePlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    places_js_1.default
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});
exports.getOnePlace = getOnePlace;
const deleteOnePlace = (req, res) => {
    const { id } = req.params;
    places_js_1.default
        .deleteOne({ _id: id }) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data) => res.json(data))
        .catch((error) => res.json({
        mensaje: error
    }));
};
exports.deleteOnePlace = deleteOnePlace;
const postPlace = (req, res) => {
    const sitio = new places_js_1.default(req.body);
    sitio
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({
        mensaje: error
    }));
};
exports.postPlace = postPlace;
const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, direction, short_direction, coordinates, category } = req.body;
    places_js_1.default
        .updateOne({ _id: id }, { $set: { name, direction, short_direction, coordinates, category } }) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data) => res.json(data))
        .catch((error) => res.json({
        mensaje: error
    }));
};
exports.updateUser = updateUser;
module.exports = {
    updateUser: exports.updateUser, getOnePlace: exports.getOnePlace, deleteOnePlace: exports.deleteOnePlace, postPlace: exports.postPlace, getPlaces: exports.getPlaces
};
