const express = require('express');
const user = express.Router();
const db = require('../config/database');

user.post("/", async(req, res, next) => {
    const {name, mail, password} = req.body;

    let query = "INSERT INTO user(user_name, user_mail, user_password) ";
    query += `VALUES ('${name}','${mail}','${password}');`;
    

    if (name && mail && password){
        const rows = db.query(query);
        if (rows.affectedRows =! 0){
            return res.status(201).json({code:201, message: 'BILL\'S PC: Entrenador pokemon registrado correctamente'});
        }else{
            return res.status(500).json({code:500, message: 'BILL\'S PC: ERROR'});
        }
    }else{
        return res.status(500).json({code:500, message: 'ERROR: Datos incompletos...'});
    }
    
});

module.exports = user;

