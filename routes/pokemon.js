const express = require('express');
const pokemon = express.Router();
//const pk = require('../pokedex.json').pokemon;
const db = require('../config/database')

pokemon.post("/", (req, res, next) => {
    //return res.status(200).send(req.body);
    return res.status(200).json(req.body);
});

pokemon.get("/", async(req, res, next) => {
    //console.log(pk);
    const pkmn = await db.query("Select * from pokemon");
    console.log(pkmn);
    //return res.status(200).send(pkmn);
    return res.status(200).json(pkmn)
});

pokemon.get("/:id([0-9]{1,3})", async(req, res, next) => {
    const id = req.params.id;
    if (id >= 0 && id <= 151){
        res.status(200);
        //return res.send(pk[req.params.id-1 ]);
        const pkmn = await db.query('Select * from pokemon where pok_id='+id+';');
        return res.status(200).json(pkmn)
    }else{
        return res.status(404).send('Pokemon no descubierto :(');
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
        return res.status(200).json(pkmn);
    }
    // for(let i = 0; i < pokemon.length; i++){
    //     if (pokemon[i].name.toLowerCase() === name.toLowerCase()){
    //         return res.status(200).send(pokemon[i]);
    //     }
    // }
    return res.status(404).send('Pokemon no descubierto :(');
});

module.exports = pokemon;