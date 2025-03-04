import mongoose from 'mongoose';
import UserNuevo from '../../src/app/model/users.js';

import { Request, Response } from 'express';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'

//para usar estas funciones, hay que añadirlas al export
const getUsers = async (req:Request, res:Response)=> {
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
    const {name, username, surname, email, role, imgProfile, comments} = req.body;
    UserNuevo
        .updateOne({_id: id}, { $set: {name, username, surname, email, role, imgProfile, comments}}) // con $set mongoDB actualiza el objeto de ese ID con el los datos del objeto que se le pasa (email, surname..).
        .then((data)=> res.json(data))
        .catch((error)=> res.json({
            mensaje: error  
        }))
}



export {
    updateUser, getOneUser, deleteOneUser, postUser, getUsers, getOneUserByEmail, getUserByEmail
}