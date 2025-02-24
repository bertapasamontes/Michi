import { Router } from "express";
import { deleteOneEvent, getOneEvent, getEvents, postEvent, updateEvent } from "../controllers/eventsController"; 

const router = Router();

router.get('/', getEvents); // cuando mi ruta sea "localhost:puerto/api/Events" quiero que haga un get a mi api y use la funcion getEvent

router.get('/:id', getOneEvent);
router.delete('/:id', deleteOneEvent);
router.post('/', postEvent);
router.put('/:id', updateEvent);

export default router;