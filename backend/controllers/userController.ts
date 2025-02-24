import mongoose from 'mongoose';
import UserNuevo from '../../src/app/model/users.js';

import { Request, Response } from 'express';

//para usar estas funciones, hay que añadirlas al module.export
export const getUsers = async (req:Request, res:Response)=> {
    UserNuevo.find()
    .then((respuesta: any)=>{
        res.status(200).json(respuesta)
    })
    .catch((error:any) =>{
        res.status(500).json({
            message: 'Ocurrió un error en la función GetUsers',
            error: error.message
        })
    })
}

export const getOneUser = async (req:Request, res: Response)=>{
    const {id} = req.params;
    UserNuevo
        .findById(id)
        .then((data)=> res.json(data))
        .catch((error)=> res.json({mensaje: error}))
}

export const deleteOneUser = (req:Request, res: Response)=>{
    const {id} = req.params;
    UserNuevo
        .deleteOne({_id: id}) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error  
        }))
}

export const postUser = (req:Request, res: Response)=>{
    const user = new UserNuevo(req.body);
    user
        .save()
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error
        }))
}

export const updateUser = (req:Request, res: Response)=>{
    const {id} = req.params;
    const {name, username, surname, email} = req.body;
    UserNuevo
        .updateOne({_id: id}, { $set: {name, username, surname, email}}) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error  
        }))
}



module.exports = {
    updateUser, getOneUser, deleteOneUser, postUser, getUsers
}