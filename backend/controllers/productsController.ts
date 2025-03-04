import mongoose from 'mongoose';
import productoNuevo from '../../src/app/model/product.js';

import { Request, Response } from 'express';

//para usar estas funciones, hay que añadirlas al module.export
export const getProducts = async (req:Request, res:Response)=> {
    productoNuevo.find()
    .then((respuesta: any)=>{
        res.status(200).json(respuesta)
    })
    .catch((error:any) =>{
        res.status(500).json({
            message: 'Ocurrió un error en la función getProducts',
            error: error.message
        })
    })
}

export const getOneProduct = async (req:Request, res: Response)=>{
    const {id} = req.params;
    productoNuevo
        .findById(id)
        .then((data)=> res.json(data))
        .catch((error)=> res.json({mensaje: error}))
}

export const deleteOneProduct = (req:Request, res: Response)=>{
    const {id} = req.params;
    productoNuevo
        .deleteOne({_id: id}) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error  
        }))
}

export const postProduct = (req:Request, res: Response)=>{
    const sitio = new productoNuevo(req.body);
    sitio
        .save()
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error
        }))
}

export const updateProduct = (req:Request, res: Response)=>{
    const {id} = req.params;
    const {name, category, price, site, comments} = req.body;
    productoNuevo
        .updateOne({_id: id}, { $set: {name, category, price, site, comments}})
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error  
        }))
}



module.exports = {
    updateProduct, getOneProduct, deleteOneProduct, postProduct, getProducts
}