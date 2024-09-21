const bodyParser = require('body-parser');//obtiene info del body
const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require('./routes/pokemon');

app.use(morgan('dev')); //ayuda ver el error con el no. de protocolo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).send("Hello, Pokedex!");
});

app.use("/pokemon",pokemon);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});