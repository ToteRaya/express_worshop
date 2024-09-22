//const bodyParser = require('body-parser');//obtiene info del body
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

app.use((req,res,next)=> {
    return res.status(404).json({code:404, message: "404: Alch no tienes que estar aquí"});
})
 
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});