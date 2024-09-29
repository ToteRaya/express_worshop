const express = require('express');
const pokemon = express.Router();
//const pk = require('../pokedex.json').pokemon;
const db = require('../config/database');

pokemon.post("/", async(req, res, next) => {
    //return res.status(200).send(req.body);
    //return res.status(200).json({code:1, message: req.body});

    const {name, height, weight, base_exp} = req.body;

    if (name && height && weight && base_exp){
        let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
        query += `VALUES ('${name}', ${height}, ${weight}, ${base_exp});`;

        const rows = await db.query(query);
        console.log(rows);
        if (rows.affectedRows > 0){
            return res.status(201).json({code:201, message: 'BILL\'S PC: Pokemon guardado correctamente'});
        }
        
        return res.status(500).json({code:500, message: 'BILL\'S PC: ERROR'});
    }else{
        return res.status(500).json({code:500, message: 'ERROR: Datos incompletos...'});
    }
    
});

pokemon.delete("/:id([0-9]{1,3})", async(req, res, next) =>{
    const query = `DELETE FROM pokemon WHERE pok_id = ${req.params.id};`;
    const rows = await db.query(query);
    
    if(rows.affectedRows ==1){
        return res.status(200).json({code:200, message:'Pokemon liberado correctamente'});
    }else{
        return res.status(404).json({code:404, message: "404: Pokemon no encontrado"});
    }
});

pokemon.put("/:id([0-9]{1,3})", async(req,res,next) =>{
    const {name, height, weight, base_exp} = req.body;

    if (name && height && weight && base_exp){
        let query = "UPDATE pokemon SET ";
        query += `pok_name = '${name}', `;
        query += `pok_height = ${height}, `;
        query += `pok_weight = ${weight}, `;
        query += `pok_base_experience = ${base_exp} `;
        query += `WHERE pok_id = ${req.params.id};`;

        const rows = await db.query(query);
        console.log(rows);
        if (rows.affectedRows > 0){
            return res.status(200).json({code:201, message: 'BILL\'S PC: Pokemon actualizado'});
        }
        
        return res.status(500).json({code:500, message: 'BILL\'S PC: ERROR'});
    }else{
        return res.status(500).json({code:500, message: 'ERROR: Datos incompletos...'});
    }
    
});

pokemon.patch("/:id([0-9]{1,3})", async(req,res,next) =>{
 
    if(req.body.name && req.params.id){
        let query = "UPDATE pokemon SET ";
        query += `pok_name='${req.body.name}'`;
        query += `WHERE pok_id = ${req.params.id};`;

        const rows = await db.query(query);
        console.log(rows);

        if (rows.affectedRows > 0){
            return res.status(200).json({code:201, message: 'BILL\'S PC: Pokemon actualizado'});
        }
        return res.status(500).json({code:500, message: 'BILL\'S PC: ERROR'});
    }else{
        return res.status(500).json({code:500, message: 'ERROR: Datos incompletos...'});
    }     
});

pokemon.get("/", async(req, res, next) => {
    //console.log(pk);
    const pkmn = await db.query("Select * from pokemon");
    console.log(pkmn);
    //return res.status(200).send(pkmn);
    return res.status(200).json({code:1, message: pkmn});
});

pokemon.get("/:id([0-9]{1,3})", async(req, res, next) => {
    const id = req.params.id;
    if (id >= 0 && id <= 722){
        res.status(200);
        //return res.send(pk[req.params.id-1 ]);
        const pkmn = await db.query('Select * from pokemon where pok_id='+id+';');
        return res.status(200).json({code:1, message: pkmn});
    }else{
        return res.status(404).json({code:404, message: "404: Pokemon no descubierto"});
    } 
});

pokemon.get("/:name([A-Za-z]+)", async(req, res, next) => {
    const name = req.params.name;
    const pkmn = await db.query("Select * from pokemon where pok_name='"+name+"';");
    // const pkmn = pk.filter( (p) => {
    //     if(p.name.toLowerCase() == name.toLowerCase()){
    //         return p;
    //     }
    // })
    if (pkmn.length > 0){
        //console.log(pk);
        //return res.status(200).send(pkmn)
        return res.status(200).json({code:1, message: pkmn});
    }
    // for(let i = 0; i < pokemon.length; i++){
    //     if (pokemon[i].name.toLowerCase() === name.toLowerCase()){
    //         return res.status(200).send(pokemon[i]);
    //     }
    // }
    return res.status(404).json({code:404, message: "404: Pokemon no descubierto"});
});

module.exports = pokemon;