"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventsController_1 = require("../controllers/eventsController");
const router = (0, express_1.Router)();
router.get('/', eventsController_1.getEvents); // cuando mi ruta sea "localhost:puerto/api/Events" quiero que haga un get a mi api y use la funcion getEvent
router.get('/:id', eventsController_1.getOneEvent);
router.delete('/:id', eventsController_1.deleteOneEvent);
router.post('/', eventsController_1.postEvent);
router.put('/:id', eventsController_1.updateEvent);
exports.default = router;
