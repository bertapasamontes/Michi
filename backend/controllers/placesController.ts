import mongoose from 'mongoose';
import sitioNuevo from '../../src/app/model/places.js';

import { Request, Response } from 'express';

//para usar estas funciones, hay que añadirlas al module.export
export const getPlaces = async (req:Request, res:Response)=> {
    sitioNuevo.find()
    .then((respuesta: any)=>{
        res.status(200).json(respuesta)
    })
    .catch((error:any) =>{
        res.status(500).json({
            message: 'Ocurrió un error en la función getPlaces',
            error: error.message
        })
    })
}

export const getOnePlace = async (req:Request, res: Response)=>{
    const {id} = req.params;
    sitioNuevo
        .findById(id)
        .then((data)=> res.json(data))
        .catch((error)=> res.json({mensaje: error}))
}

export const deleteOnePlace = (req:Request, res: Response)=>{
    const {id} = req.params;
    sitioNuevo
        .deleteOne({_id: id}) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error  
        }))
}

export const postPlace = (req:Request, res: Response)=>{
    const sitio = new sitioNuevo(req.body);
    sitio
        .save()
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error
        }))
}

export const updatePlace = (req:Request, res: Response)=>{
    const {id} = req.params;
    const {name, direction, short_direction, coordinates, category} = req.body;
    sitioNuevo
        .updateOne({_id: id}, { $set: {name, direction, short_direction, coordinates, category}}) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error  
        }))
}



module.exports = {
    updatePlace, getOnePlace, deleteOnePlace, postPlace, getPlaces
}