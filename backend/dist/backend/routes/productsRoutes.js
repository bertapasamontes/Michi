"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
const router = (0, express_1.Router)();
router.get('/', productsController_1.getProducts); // cuando mi ruta sea "localhost:puerto/api/Products" quiero que haga un get a mi api y use la funcion getProduct
router.get('/:id', productsController_1.getOneProduct);
router.delete('/:id', productsController_1.deleteOneProduct);
router.post('/', productsController_1.postProduct);
router.put('/:id', productsController_1.updateProduct);
exports.default = router;
