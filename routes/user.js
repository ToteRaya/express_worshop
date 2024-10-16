const express = require('express');
const jwt = require('jsonwebtoken');
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

user.post("/login", async(req, res, next)=> {
    const {mail, password} = req.body;
    const query = `SELECT * FROM user WHERE user_mail = '${mail}' AND user_password = '${password}';`;
    const rows = await db.query(query);
    console.log(rows);

    if( mail && password ){
        if (rows.length == 1){
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "viejolesbiano"); //contraseña

            return res.status(200).json({code: 200, message: token});
        }else{
            return res.status(200).json({code: 200, message: "ERROR"});
        }
    }else{
        return res.status(500).json({code: 500, message: "Campos incompletos"});
    } 
});

user.get("/", async(req, res, next) => {
    const query = "SELECT * FROM user"
    const rows = await db.query(query);

    return res.status(200).json({code: 200, message: rows});
});

module.exports = user;

