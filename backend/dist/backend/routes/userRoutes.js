"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/', userController_1.getUsers); // cuando mi ruta sea "localhost:puerto/api/users" quiero que haga un get a mi api y use la funcion getUser
router.get('/id/:id', userController_1.getOneUser);
router.get('/email/:email', userController_1.getUserByEmail);
// router.get('/email/:email', getOneUserByEmail);
router.post('/login', userController_1.getOneUserByEmail);
router.delete('/:id', userController_1.deleteOneUser);
router.post('/', userController_1.postUser);
router.put('/:id', userController_1.updateUser);
exports.default = router;
