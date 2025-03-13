import { Router } from "express";
import { deleteOneFav, deleteOneUser, getOneUser, getOneUserByEmail, getUserByEmail, getUsers, postUser, saveFav, updateUser } from "../controllers/userController"; 

const router = Router();

router.get('/', getUsers); // cuando mi ruta sea "localhost:puerto/api/users" quiero que haga un get a mi api y use la funcion getUser

router.get('/id/:id', getOneUser);
router.get('/email/:email', getUserByEmail);
// router.get('/email/:email', getOneUserByEmail);
router.post('/login', getOneUserByEmail);
router.delete('/:id', deleteOneUser);
router.post('/', postUser);
router.put('/:id', updateUser);

//favs
router.post('/:idUser/guardarProducto/:idProducto', saveFav);
router.post("/:idUser/eliminarProducto/:idProducto", deleteOneFav);


export default router;