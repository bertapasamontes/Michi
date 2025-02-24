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
exports.updateEvent = exports.postEvent = exports.deleteOneEvent = exports.getOneEvent = exports.getEvents = void 0;
const events_js_1 = __importDefault(require("../../src/app/model/events.js"));
//para usar estas funciones, hay que añadirlas al module.export
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    events_js_1.default.find()
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
exports.getEvents = getEvents;
const getOneEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    events_js_1.default
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ mensaje: error }));
});
exports.getOneEvent = getOneEvent;
const deleteOneEvent = (req, res) => {
    const { id } = req.params;
    events_js_1.default
        .deleteOne({ _id: id }) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data) => res.json(data))
        .catch((error) => res.json({
        mensaje: error
    }));
};
exports.deleteOneEvent = deleteOneEvent;
const postEvent = (req, res) => {
    const sitio = new events_js_1.default(req.body);
    sitio
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({
        mensaje: error
    }));
};
exports.postEvent = postEvent;
const updateEvent = (req, res) => {
    const { id } = req.params;
    const { title, description, start, end } = req.body;
    events_js_1.default
        .updateOne({ _id: id }, { $set: { title, description, start, end } }) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data) => {
        res.json(data);
        console.log("datos desde events controler: ", data);
    })
        .catch((error) => res.json({
        mensaje: error
    }));
};
exports.updateEvent = updateEvent;
module.exports = {
    updateEvent: exports.updateEvent, getOneEvent: exports.getOneEvent, deleteOneEvent: exports.deleteOneEvent, postEvent: exports.postEvent, getEvents: exports.getEvents
};
