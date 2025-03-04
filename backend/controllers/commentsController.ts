import mongoose from 'mongoose';
import comentarioNuevo from '../../src/app/model/comments.js';

import { Request, Response } from 'express';

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

export const postComment = (req:Request, res: Response)=>{
    const sitio = new comentarioNuevo(req.body);
    sitio
        .save()
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error
        }))
}

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