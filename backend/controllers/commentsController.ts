import mongoose from 'mongoose';
import comentarioNuevo from '../../src/app/model/comments.js';

import { Request, Response } from 'express';
import {ProductoNuevo} from '../../src/app/model/product.js'

//para usar estas funciones, hay que añadirlas al module.export
export const getComments = async (req:Request, res:Response)=> {
    comentarioNuevo.find()
    .then((respuesta: any)=>{
        res.status(200).json(respuesta)
    })
    .catch((error:any) =>{
        res.status(500).json({
            message: 'Ocurrió un error en la función getComments',
            error: error.message
        })
    })
}

export const getOneComment = async (req:Request, res: Response)=>{
    const {id} = req.params;
    comentarioNuevo
        .findById(id)
        .populate({
            path: 'user',
            model: 'UsersDeMichi',
            select: '-_v',
        })
        .then((data)=> res.json(data))
        .catch((error)=> res.json({mensaje: error}))
}

export const deleteOneComment = (req:Request, res: Response)=>{
    const {id} = req.params;
    comentarioNuevo
        .deleteOne({_id: id})
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error  
        }))
}
export const postComment = async (req:Request, res: Response)=>{
    try{
        const {idProducto} = req.params;
        const {user, text} = req.body;

        //creamos nuevo comentario
        const nuevoComment = new comentarioNuevo({user, text});
        await nuevoComment.save();

        //lo añadimos al producto al que hace referencia
        const producto = await ProductoNuevo.findById(idProducto); //cogemos el producto
        if(!producto){ //miramos si existe
            console.log("NO EXISTE ESTE PRODUCTO");
        }
        producto?.comments.push(nuevoComment._id); //añadimos el id del comentario en el array comentarios del producto
        await producto?.save(); //guardamos

        res.status(201).json({ mensaje: "Comentario agregado correctamente", producto });
    }
    catch (error){
        res.status(500).json({ mensaje: "El comentario no se ha podido agregar al producto", error: error });
    }
}

// export const postComment = (req:Request, res: Response)=>{
//     const sitio = new comentarioNuevo(req.body);
//     sitio
//         .save()
//         .then((data)=> res.json(data))
//         .catch((error)=> res.json({
//             mensaje: error
//         }))
// }

// export const updateComment = (req:Request, res: Response)=>{
//     const {id} = req.params;
//     const {name, category, price, site, comments} = req.body;
//     comentarioNuevo
//         .updateOne({_id: id}, { $set: {name, category, price, site, comments}})
//         .then((data)=> res.json(data))
//         .catch((error)=> res.json({
//             mensaje: error  
//         }))
// }



module.exports = {
    getOneComment, deleteOneComment, postComment, getComments
}