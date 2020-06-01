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
            attributes: ["EmployeeId", "FirstName", "LastName", "ReportsTo"],
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
    router.post("/customers", async (req, res)=>{
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
        const idaux = req.query.employee;
        const cliente= await models.AuxCustomers.findAll({
            attributes: ["CustomerId", "FirstName", "LastName", "City", "State", "Country", "PostalCode", "Phone", "Email"],
            where: {SupportRepId: idaux}
        });
         res.send(cliente);

    });

    router.get("/customers/:id/tracks", async (req, res) => {
        const urlid= req.params.id;
        const fil1= await models.AuxInvoices.findAll({
            attributes: ["InvoiceId"],
            where: {
                CustomerId: urlid
            },
            raw: true
        });
        const fil2 = await models.AuxInvoices_Items.findAll({
            attributes: ["TrackId"],
            where: {
                [seq.or]: fil1
            },
            raw: true
        });
        const fil3 = await models.AuxTracks.findAll({
            attributes: ["TrackId", "Name", "UnitPrice"],
            where: {
                [seq.or]: fil2
            }
        });
        res.send(fil3);
    });

    router.post("/invoices", async (req, res)=> {
        const factura = req.body;
        await models.AuxInvoices.create(factura);
        res.send({
            message: '¡Factura Registrada Satisfactoriamente!'
        });
    });

    router.get("/tracks", async (req, res) => {
        const artist = req.query.artist;
        const f1 = await models.AuxAlbums.findAll({
            attributes: ["AlbumId"],
            where: {
                ArtistId: artist
            },
            raw: true
        });
        const f2 = await models.AuxTracks.findAll({
            attributes: ["TrackId", "Name"],
            where: {
                [seq.or]: f1
            }
        });
        res.send(f2);
    });
    
    router.get("/albums", async (req, res)=> {
        const artist = req.query.artistId;
        const answer = await models.AuxAlbums.findAll({
            attributes: ["Title"],
            where: {
                ArtistId: artist
            }
        });
        res.send(answer);
    });
    
    router.get("/playlists/:id", async (req, res)=> {
        const urltrack = req.params.id;
        const fi1 = await models.AuxPlaylist_Tracks.findAll({
            attributes: ["PlaylistId"],
            where: {
                TrackId: urltrack
            },
            raw: true
        });                          
        const fi2 = await models.AuxPalylists.findAll({
            attributes: ["Name"],
            where: {
                [seq.or]: fi1
            }
        });
        res.send(fi2);
    });

    router.get("/invoices/", async (req, res)=> {
        const auxid = req.query.invoiceId;
        const itemsfac = await models.AuxInvoices_Items.findAll({
            attributes: ["TrackId"],
            where: {
                InvoiceId: auxid
            },
            raw: true
        });
        const listacanciones = await models.AuxTracks.findAll({
            attributes: ["Name"],
            where: {
                [seq.or]: itemsfac
            }
        });
        res.send(listacanciones);
    });

    return router;
}