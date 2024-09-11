const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

app.get("/", (req, res, next) => {
    return res.status(200).send('Hello, Pokedex!');
});

app.post('/pokemon', (req, res, next) => {
    return res.status(200).send("Estas en el pokePOST");
});

app.get("/pokemon", (req, res, next) => {
    return res.status(200).send(pokemon);
});

app.get("/pokemon/:id([0-9]{1,3})", (req, res, next) => {
    const id = req.params.id -1;
    if (id >= 0 && id <= 151){
        res.status(200);
        return res.send(pokemon[req.params.id-1 ]);
    }else{
        return res.status(404).send('Pokemon no descubierto :(');
    }
    
    
});

app.get("/pokemon/:name([A-Za-z]+)", (req, res, next) => {
    const name = req.params.name;
    const pk = pokemon.filter( (p) => {
        if(p.name.toLowerCase() == name.toLowerCase()){
            return p;
        }
    })
    
    if (pk.length > 0){
        console.log(pk);
        return res.status(200).send(pk)
    }
    

    // for(let i = 0; i < pokemon.length; i++){
    //     if (pokemon[i].name.toLowerCase() === name.toLowerCase()){
    //         return res.status(200).send(pokemon[i]);
    //     }
    // }

    return res.status(404).send('Pokemon no descubierto :(');
});


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});