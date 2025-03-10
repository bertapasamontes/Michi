import { Router } from "express";
import { deleteOneProduct, getOneProduct, getOneProductWithComments, getProducts, getProductsWithoutPages, postProduct, updateProduct } from "../controllers/productsController"; 

const router = Router();

router.get('/', getProducts); // cuando mi ruta sea "localhost:puerto/api/Products" quiero que haga un get a mi api y use la funcion getProduct
router.get('/all', getProductsWithoutPages); 
router.get('/:id', getOneProductWithComments);
router.delete('/:id', deleteOneProduct);
router.post('/', postProduct);
router.put('/:id', updateProduct);

export default router;