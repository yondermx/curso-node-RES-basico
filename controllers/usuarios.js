const {response, request} = require('express');
const bcryptjs = require('bcryptjs');



const Usuario = require('../models/usuario');

const usuario = (req, res = response)=>{
    res.json({msg: "routerEsta es una prueba de envio GET"
    });
}
const usuarioGet = async (req = request, res = response)=>{
    // const {q, nombre="Sin nombre", apikey, page=1, limit} = req.query;

    const {limite=5, desde=0} = req.query;
    const condicion= {estado: true};
    // const usuarios= await Usuario.find();// Trae todos los usuarios de la BD
    // const usuarios= await Usuario.find(condicion)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(condicion);

    const [total,  usuarios] =  await Promise.all([
        Usuario.countDocuments(condicion),
        Usuario.find(condicion)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    
    res.json({
        total,
        usuarios
    });
}

const usuarioPost = async (req, res = response)=>{
        
    // const usuario = new Usuario(body);
    const {nombre,correo, password, rol} = req.body;
    const usuario = new Usuario({nombre,correo, password, rol})
   
    // Encriptar la contraseña

    const salt = bcryptjs.genSaltSync(); // Genera el salt (complejidad de 10 por default)
    usuario.password = bcryptjs.hashSync(password, salt); //Encripta

     await usuario.save();
     usuario.password =undefined;
    res.json({
        msg: "Datos del usuario guardados -POST-",
        usuario
    });
}
const usuarioPut =async (req, res = response)=>{
    const {id} = req.params;
    const {_id, password, google, correo, ... resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync(); // Genera el salt (complejidad de 10 por default)
        resto.password = bcryptjs.hashSync(password, salt); //Encripta    
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto,  {new: true})
    
    res.json(usuario);
}
const usuarioPatch = (req, res = response)=>{
    res.json({msg: "routerEsta es una prueba de envio PATCH"
    });
}
const usuarioDelete = async(req, res = response)=>{

    const {id}= req.params;

    //BORRADO FISICO
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await  Usuario.findByIdAndUpdate(id, {estado: false},{ new:true});

    res.json({
        usuario
    });
}




module.exports = { usuario,usuarioGet, usuarioPost,usuarioPut, usuarioPatch, usuarioDelete}