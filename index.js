const express = require("express");
const app = express();
const models = require("./configuracion-db");
const api = require("./routes/routes")(models);
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/api",api);

app.get("/employees", async (req,res)=>{
    const varuno = await models.AuxEmployees.findAll({/*attributes: ['EmployeeId']*/});
    res.send(varuno);
});
app.get("/artists", async (req,res)=>{
    const art = await models.AuxArtists.findAll({});
    res.send(art);
});
app.get("/customers", async (req, res)=>{
    const cus = await models.AuxCustomers.findAll({});
    res.send(cus);
});
app.all("/",(req, res)=>{
    res.send("Direccion raiz");
});

app.listen(port, ()=>{
    console.log(`Enlazado a puerto ${port}`);
});

