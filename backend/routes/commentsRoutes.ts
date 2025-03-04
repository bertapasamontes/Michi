import { Router } from "express";
import { deleteOneComment, getOneComment, getComments, postComment } from "../controllers/commentsController"; 

const router = Router();

router.get('/', getComments); // cuando mi ruta sea "localhost:puerto/api/Comments" quiero que haga un get a mi api y use la funcion getComment

router.get('/:id', getOneComment);
router.delete('/:id', deleteOneComment);
router.post('/', postComment);
// router.put('/:id', updateComment);

export default router;