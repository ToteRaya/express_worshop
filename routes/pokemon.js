const express = require('express');
const pokemon = express.Router();
const pk = require('../pokedex.json').pokemon;

pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body);
});

pokemon.get("/", (req, res, next) => {
    //console.log(pk);
    return res.status(200).send(pk);
});

pokemon.get("/:id([0-9]{1,3})", (req, res, next) => {
    const id = req.params.id -1;
    if (id >= 0 && id <= 151){
        res.status(200);
        return res.send(pk[req.params.id-1 ]);
    }else{
        return res.status(404).send('Pokemon no descubierto :(');
    }
    
    
});

pokemon.get("/:name([A-Za-z]+)", (req, res, next) => {
    const name = req.params.name;
    const pkmn = pk.filter( (p) => {
        if(p.name.toLowerCase() == name.toLowerCase()){
            return p;
        }
    })
    
    if (pkmn.length > 0){
        //console.log(pk);
        return res.status(200).send(pkmn)
    }
    

    // for(let i = 0; i < pokemon.length; i++){
    //     if (pokemon[i].name.toLowerCase() === name.toLowerCase()){
    //         return res.status(200).send(pokemon[i]);
    //     }
    // }

    return res.status(404).send('Pokemon no descubierto :(');
});

module.exports = pokemon;