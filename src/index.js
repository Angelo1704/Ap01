const express = require("express");
const app = express();

const routes = require("./routes");
const port = 3000;

app.use(express.urlencoded({ extended: true}));

app.use(express.json());

app.use(routes);

app.listen(port, ()=>{
    console.log("API times rodando na porta "+port);
});