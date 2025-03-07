import { ProductoNuevo } from '../../src/app/model/product.js';

import { Request, Response } from 'express';

import {PixabayImagesService} from '../services/pixabayImages/pixabay-images.service.js'


const _pixabayImages = new PixabayImagesService();

//para usar estas funciones, hay que añadirlas al module.export
export const getProducts = async (req:Request, res:Response)=> {
    ProductoNuevo.find()
    .populate({
        path: 'site',
        model: 'sitiosDeMichi',
        select: 'name'
    })
    .populate({
        path: 'comments',
        model: 'comentarios',
        select: 'text',
        populate:{
            path: 'user',
            model: 'UsersDeMichi',
            select: 'username'
        }
    })
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
    ProductoNuevo
        .findById(id)
        .then((data)=> res.json(data))
        .catch((error)=> res.json({mensaje: error}))
}
export const getOneProductWithComments = async (req:Request, res: Response)=>{
    try{
        const {id} = req.params;
        const producto = await ProductoNuevo.findById(id).populate({
            path: 'comments',
            model: 'comentarios'
        });
        if (!producto) {
            res.status(404).json({ mensaje: "Producto no encontrado" });
            return
        }
       

        res.status(200).json(producto);
    }
    catch (error){
        res.status(500).json({ mensaje: "Error al obtener el producto", error: error });
    }
}

export const deleteOneProduct = (req:Request, res: Response)=>{
    const {id} = req.params;
    ProductoNuevo
        .deleteOne({_id: id}) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error  
        }))
}

export const postProduct = async (req:Request, res: Response):Promise<void>=>{
    try{
        const {name, category, price, site, rate, comments} = req.body;
        const imgProduct = await _pixabayImages.getImageFromPixabay(name);

        console.log("imgProduct: ",imgProduct);

        if (!imgProduct || imgProduct.trim() === '') {
            res.status(400).json({ mensaje: 'No se pudo obtener una URL de imagen válida' });
        }

        const producto = new ProductoNuevo({
            name, category, price, site, rate, comments, imgProduct
        });
        try{
            console.log("Producto a guardar:", producto);
            const productoGuardado = await producto.save()
            res.json({data: productoGuardado, mensaje: 'Producto guardado'});
                
        }
        catch(error){
            res.status(500).json({ mensaje: "Error al crear el producto", error: error });
        }
        
        // res.status(200).json(producto);
    }
    catch(error){
        res.status(500).json({ mensaje: "Error en postProduct", error: error });
    }
    
}

export const updateProduct = (req:Request, res: Response)=>{
    const {id} = req.params;
    const {name, category, price, site, comments, rate, imgProduct} = req.body;
    ProductoNuevo
        .updateOne({_id: id}, { $set: {name, category, price, site, comments, rate, imgProduct}})
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error  
        }))
}


// module.exports = {
//     updateProduct, getOneProduct, deleteOneProduct, postProduct, getProducts
// }