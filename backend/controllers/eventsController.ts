import mongoose from 'mongoose';
import EventoNuevo from '../../src/app/model/events.js';

import { Request, Response } from 'express';

//para usar estas funciones, hay que añadirlas al module.export
export const getEvents = async (req:Request, res:Response)=> {
    EventoNuevo.find()
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

export const getOneEvent = async (req:Request, res: Response)=>{
    const {id} = req.params;
    EventoNuevo
        .findById(id)
        .then((data)=> res.json(data))
        .catch((error)=> res.json({mensaje: error}))
}

export const deleteOneEvent = (req:Request, res: Response)=>{
    const {id} = req.params;
    EventoNuevo
        .deleteOne({_id: id}) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error  
        }))
}

export const postEvent = (req:Request, res: Response)=>{
    const sitio = new EventoNuevo(req.body);
    sitio
        .save()
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error
        }))
}

export const updateEvent = (req:Request, res: Response)=>{
    const {id} = req.params;
    const {title, description, start, end} = req.body;
    EventoNuevo
        .updateOne({_id: id}, { $set: {title, description, start, end}}) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data)=> {
            res.json(data);
            console.log("datos desde events controler: ", data)}
        )
        .catch((error)=> res.json({
            mensaje: error  
        }))
}



module.exports = {
    updateEvent, getOneEvent, deleteOneEvent, postEvent, getEvents
}