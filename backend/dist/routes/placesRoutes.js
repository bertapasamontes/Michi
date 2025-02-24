"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const placesController_1 = require("../controllers/placesController");
const router = (0, express_1.Router)();
router.get('/', placesController_1.getPlaces); // cuando mi ruta sea "localhost:puerto/api/Places" quiero que haga un get a mi api y use la funcion getPlace
router.get('/:id', placesController_1.getOnePlace);
router.delete('/:id', placesController_1.deleteOnePlace);
router.post('/', placesController_1.postPlace);
router.put('/:id', placesController_1.updatePlace);
exports.default = router;
