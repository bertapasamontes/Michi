"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/', userController_1.getUsers); // cuando mi ruta sea "localhost:puerto/api/users" quiero que haga un get a mi api y use la funcion getUser
router.get('/:id', userController_1.getOneUser);
router.delete('/:id', userController_1.deleteOneUser);
router.post('/', userController_1.postUser);
router.put('/:id', userController_1.updateUser);
exports.default = router;
