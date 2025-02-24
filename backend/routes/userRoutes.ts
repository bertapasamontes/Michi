import { Router } from "express";
import { deleteOneUser, getOneUser, getUsers, postUser, updateUser } from "../controllers/userController"; 

const router = Router();

router.get('/', getUsers); // cuando mi ruta sea "localhost:puerto/api/users" quiero que haga un get a mi api y use la funcion getUser

router.get('/:id', getOneUser);
router.delete('/:id', deleteOneUser);
router.post('/', postUser);
router.put('/:id', updateUser);

export default router;