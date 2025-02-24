import { Router } from "express";
import { deleteOnePlace, getOnePlace, getPlaces, postPlace, updatePlace } from "../controllers/placesController"; 

const router = Router();

router.get('/', getPlaces); // cuando mi ruta sea "localhost:puerto/api/Places" quiero que haga un get a mi api y use la funcion getPlace

router.get('/:id', getOnePlace);
router.delete('/:id', deleteOnePlace);
router.post('/', postPlace);
router.put('/:id', updatePlace);

export default router;