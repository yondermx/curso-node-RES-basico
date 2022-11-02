const {response, request} = require('express');

const usuario = (req, res = response)=>{
    res.json({msg: "routerEsta es una prueba de envio GET"
    });
}
const usuarioGet = (req = request, res = response)=>{
    const {q, nombre="Sin nombre", apikey, page=1, limit} = req.query;
    res.json({
        msg: "routerEsta es una prueba de envio GET",
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuarioPost = (req, res = response)=>{
    const {nombre, edad} = req.body;
    res.json({
        msg: "routerEsta es una prueba de envio POST",
        nombre, 
        edad
    });
}
const usuarioPut = (req, res = response)=>{
    const {id} = req.params;
    res.status(201).json({
        msg: "routerEsta es una prueba de envio PUT",
        id
        
    });
}
const usuarioPatch = (req, res = response)=>{
    res.json({msg: "routerEsta es una prueba de envio PATCH"
    });
}
const usuarioDelete = (req, res = response)=>{
    res.json({msg: "routerEsta es una prueba de envio DELETE"
    });
}




module.exports = { usuario,usuarioGet, usuarioPost,usuarioPut, usuarioPatch, usuarioDelete}