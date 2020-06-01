const router = require("express").Router();
const Sequelize = require("sequelize");
const seq = Sequelize.Op;
module.exports = (models) => {
    router.get("/employees", async (req, res) => {
        const emp = await models.AuxEmployees.findAll({ attributes: ["EmployeeId", "FirstName", "LastName"] });
        res.send(emp);
    });
    router.get("/employees/:id", async (req, res) => {
        const urlid = req.params.id;
        const employeefilter = await models.AuxEmployees.findAll({
            attributes: ["EmployeeId", "FirstName", "LastName"],
            where: { Reportsto: urlid }
        });
        res.send(employeefilter);
        //res.send(req.params.id);
    });
    router.get("/invoices/:idCustomer", async (req, res)=> {
        const urlid = req.params.idCustomer;
        const facturafiltro = await models.AuxInvoices.findAll({
            attributes: ["InvoiceId", "InvoiceDate", "BillingCity"],
            where: {
                CustomerId: urlid
            }
        });
        res.send(facturafiltro);
    });
    router.post("/employees", async (req, res)=>{
        const employee = req.body;
        await models.AuxEmployees.create(employee);
        res.send({
            message: '¡Registro Exitoso!'
        });
    });
    router.put("/employees/:id",async (req, res)=>{
        const aux = req.params.id;
        const updateemployee = req.body;
        await models.AuxEmployees.update(updateemployee, { where: {EmployeeId: aux}});
        res.send({
            message: '¡Datos Del Empleado Actualizados Exitosamente!'
        });
    });
    router.post("/customer", async (req, res)=>{
        const customer = req.body;
        await models.AuxCustomers.create(customer);
        res.send({
            message: '¡Cliente Registrado Exitosamente!'
        });
    });

    router.get("/customers/:id/genres", async (req, res) => {

        const urlid = req.params.id;
        const filtro1 = await models.AuxInvoices.findAll({
            attributes: ["InvoiceId"],
            where: { CustomerID: urlid },
            raw: true
        });

        const filtro2 = await models.AuxInvoices_Items.findAll({
            attributes: ["TrackId"],
            where: {
                [seq.or]: filtro1
            },
            raw: true
        });
        const filtro3 = await models.AuxTracks.findAll({
            attributes: ["GenresId"],
            where:{
                [seq.or]: filtro2
            },
            raw: true
        });

        const filtro4 = await models.AuxGenres.findAll({
            attributes: ["Name"],
            where: {
                [seq.or]: filtro3
            }
        });

        res.send(filtro4);
    });

    router.get("/customers", async (req, res)=>{
        const idaux = req.query.empleado;
        const cliente= await models.AuxCustomers.findAll({
            attributes: ["CustomerId", "FirstName", "LastName", "City", "State", "Country", "PostalCode", "Phone", "Email"],
            where: {SupportRepId: idaux}
        });
         res.send(cliente);

    });

    return router;
}