import mongoose from 'mongoose';
import UserNuevo from '../../src/app/model/users.js';

import { Request, Response } from 'express';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'

//para usar estas funciones, hay que añadirlas al export
const getUsers = async (req:Request, res:Response)=> {

    try{
        //Config para paginas y limites de items:
    const page = parseInt(req.query.page as string) || 1;  // Página actual (por defecto, página 1)
    const limit = parseInt(req.query.limit as string) || 5; // Cantidad de productos por página (por defecto, 5 productos por página)
    const skip = (page - 1) * limit;  // Calcular los productos que hay que saltarse según la página

    const usuarios = await UserNuevo.find()
    .skip(skip)
    .limit(limit)

     // Contar el total de productos para calcular las páginas
    const total = await UserNuevo.countDocuments();

    
        res.status(200).json({
            data: usuarios,
            total,
            page,
            totalPages:  Math.ceil(total / limit)
        })

    }
    catch(error){
    res.status(500).json({
        message: 'Ocurrió un error en la función GetUsers',
        error: error
    })
    }
}

const getOneUserByEmail = async (req:Request, res: Response): Promise<any>=>{

    try{
        const {email, password} = req.body;

        const usuarioDB = await UserNuevo.findOne({ email });
        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                error:{message: 'User no encontrado'}
            })
        }
        const passwordCorrecto = await bcrypt.compare(password, usuarioDB.password);
        if (!passwordCorrecto) {
            return res.status(400).json({
                ok: false,
                error: { message: "Usuario o contraseña incorrectos" }
            });
        }

        const secret = "secreto";
        // const experiesIn = '7d';
       
        const tokenDelUser = jwt.sign( // Generar token de autenticación
            { id: usuarioDB._id, email: usuarioDB.email }, // Solo almacenamos el ID
            secret,
            {expiresIn: '7d'}
        );
        if(tokenDelUser){
            console.log("tokenDelUser:", tokenDelUser);
        }
        

        return res.json({ ok: true, usuario: usuarioDB, tokenDelUser });
    }
    catch(error){
        return res.status(500).json({
            message: 'Error de autenticación',
            error: error
        })
    }
}

const getOneUser = async (req:Request, res: Response)=>{
    const {id} = req.params;
    UserNuevo
        .findById(id)
        .populate({
            path: 'misFavs',
            model: 'productos',
            select: '_v'
        })
        .then((data)=> res.json(data))
        .catch((error)=> res.json({mensaje: error}))
}

const getUserByEmail = async (req:Request, res: Response)=>{
    const {email} = req.params;
    UserNuevo
        .findOne({email})
        .then((data)=> res.json(data))
        .catch((error)=> res.json({mensaje: error}))
}

const deleteOneUser = (req:Request, res: Response)=>{
    const {id} = req.params;
    UserNuevo
        .deleteOne({_id: id}) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error  
        }))
}

const postUser = (req:Request, res: Response)=>{
    const user = new UserNuevo(req.body);
    user
        .save()
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error
        }))
}

const updateUser = (req:Request, res: Response)=>{
    const {id} = req.params;
    const {name, username, email, role, imgProfile, comments} = req.body;
    UserNuevo
        .updateOne({_id: id}, { $set: {name, username, email, role, imgProfile, comments}}) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email..).
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error  
        }))
}

//guardar fav
const saveFav = async (req: Request, res: Response): Promise<any> => {
    try {
      const {id} = req.params;  //id del usuario logueado
      const { productId } = req.body; //id del producto
  
      const user = await UserNuevo.findById({id});
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  
      if (!user.misFavs.includes(productId)) {
        user.misFavs.push(productId);
        await user.save();
      }
  
      return res.json({ message: 'Producto guardado', misFavs: user.misFavs });
    } catch (error) {
      return res.status(500).json({ message: 'Error al guardar producto', error });
    }
};

const deleteOneFav = (req: Request, res: Response) => {
    const { idUser, idProducto } = req.params; //obtenemos id del user y del producto

    UserNuevo.updateOne(
        { _id: idUser }, //buscamos el user por su id
        { $pull: { misFavs: idProducto } } //$pull elimina solo un item especifico de un doc. le pasamos el id del producto dentro de misFavs.
    )
    .then((data) => res.json({ mensaje: "Producto eliminado de favoritos", data }))
    .catch((error) => res.status(500).json({ mensaje: error }));
};


export {
    updateUser, getOneUser, deleteOneUser, postUser, getUsers, getOneUserByEmail, getUserByEmail, saveFav, deleteOneFav
}