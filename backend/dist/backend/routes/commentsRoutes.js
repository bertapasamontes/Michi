"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentsController_1 = require("../controllers/commentsController");
const router = (0, express_1.Router)();
router.get('/', commentsController_1.getComments); // cuando mi ruta sea "localhost:puerto/api/Comments" quiero que haga un get a mi api y use la funcion getComment
router.get('/:id', commentsController_1.getOneComment);
router.delete('/:id', commentsController_1.deleteOneComment);
router.post('/:idProducto', commentsController_1.postComment);
// router.put('/:id', updateComment);
exports.default = router;
