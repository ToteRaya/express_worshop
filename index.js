const morgan = require('morgan');
const express = require('express');
const app = express();
//Routers
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');
//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const hello = require('./middleware/hello');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev')); //ayuda ver el error con el no. de protocolo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", hello);
app.use("/user",user);

app.use(auth);
app.use("/pokemon",pokemon);

app.use(notFound);
 
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});