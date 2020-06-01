const Sequelize = require("sequelize");
const Model = Sequelize.Model;
var AuxCustomers = null, AuxEmployees = null, AuxArtists = null, AuxAlbums = null, AuxTracks = null, AuxGenres = null, AuxMedia_Types = null, AuxPlaylist_Tracks = null, AuxPalylists = null, AuxInvoices_Items = null, AuxInvoices = null;
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'store.sqlite'
});

(async () => {
    class Customers extends Model { }
    AuxCustomers = Customers.init({
        CustomerId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        LastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        FirstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Company: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        City: {
            type: Sequelize.STRING,
            allowNull: false
        },
        State: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Country: {
            type: Sequelize.STRING,
            allowNull: false
        },
        PostalCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Fax: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        SupportRepId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, { sequelize, modelName: 'Customers' });

    class Employees extends Model { }
    AuxEmployees = Employees.init({
        EmployeeId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        FirstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        LastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        BirthDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        HireDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        Address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ReportsTo: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    }, { sequelize, modelName: 'Employees' });

    class Invoices extends Model { }
    AuxInvoices = Invoices.init({
        InvoiceId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },/*
        CustomerId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },*/
        InvoiceDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        BillingAdress: {
            type: Sequelize.STRING,
            allowNull: false
        },
        BillingCity: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, { sequelize, modelName: 'Invoices' });

    class Invoices_items extends Model { }
    AuxInvoices_Items = Invoices_items.init({
        InvoiceItemId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },/*
        InvoiceId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        TrackId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },*/
        UnitPrice: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        Quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, { sequelize, modelName: 'Invoices_items' });

    class Albums extends Model { }
    AuxAlbums = Albums.init({
        AlbumId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Title: {
            type: Sequelize.STRING,
            allowNull: false
        }/*,
        ArtistId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }*/
    }, { sequelize, modelName: 'Albums' });

    class Playlists extends Model { }
    AuxPalylists = Playlists.init({
        PlaylistId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, { sequelize, modelName: 'Playlists' });

    class Playlists_track extends Model { }
    AuxPlaylist_Tracks = Playlists_track.init({
    }, { sequelize, modelName: 'Playlists_track' });

    class Tracks extends Model { }
    AuxTracks = Tracks.init({
        TrackId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        },/*
        AlbumId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        MediaTypeId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        GenreId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },*/
        Composer: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Milliseconds: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Bytes: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        UnitPrice: {
            type: Sequelize.DECIMAL,
            allowNull: false
        }
    }, { sequelize, modelName: 'Tracks' });

    class Artists extends Model { }
    AuxArtists = Artists.init({
        ArtistId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, { sequelize, modelName: 'Artists' });

    class Media_types extends Model { }
    AuxMedia_Types = Media_types.init({
        MediaTypeId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, { sequelize, modelName: 'Media_types' });

    class Genres extends Model { }
    AuxGenres = Genres.init({
        GenresId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, { sequelize, modelName: 'Genres' });

    Albums.belongsTo(Artists, { foreignKey: 'ArtistId', as: 'AlbumsToArtists' });
    Artists.hasMany(Albums, { foreignKey: 'ArtistId', as: 'ArtistsToAlbums' });
    
    Playlists.belongsToMany(Tracks, { as: 'PlaylistsToTracks', through: Playlists_track, foreignKey: 'PlaylistId' });
    Tracks.belongsToMany(Playlists, { as: 'TracksToPlaylists', through: Playlists_track, foreignKey: 'TrackId' });

    Media_types.hasMany(Tracks, { foreignKey: 'MediaTypeId', as: 'Media_typeToTracks' });
    Tracks.belongsTo(Media_types, { foreignKey: 'MediaTypeId', as: 'TracksToMediatype' });

    Genres.hasMany(Tracks, { foreignKey: 'GenresId', as: 'GenresToTracks' });
    Tracks.belongsTo(Genres, { foreignKey: 'GenresId', as: 'TrakcsToGenres' });

    Invoices.belongsToMany(Tracks, { as: 'Invoices_itemsToTracks', through: Invoices_items, foreignKey: 'InvoiceId' });
    Tracks.belongsToMany(Invoices, { as: 'TracksToInvoices_items', through: Invoices_items, foreignKey: 'TrackId' });

    Albums.hasMany(Tracks, { foreignKey: 'AlbumId', as: 'AlbumsToTracks' });
    Tracks.belongsTo(Albums, { foreignKey: 'AlbumId', as: 'TracksToAlbums' });

    Invoices.belongsTo(Customers, { foreignKey: 'CustomerId', as: 'InvoicesToCustomers' });
    Customers.hasMany(Invoices, { foreignKey: 'CustomerId', as: 'CustomersToInvoices' });

    Employees.hasMany(Customers, { foreignKey: 'SupportRepId', as: 'EmployeesToCustomers' });
    Customers.belongsTo(Employees, { foreignKey: 'SupportRepId', as: 'CustomerstoEmployees' });

    Employees.hasMany(Employees, { foreignKey: 'ReportsTo', as: 'ReportsToToEmployeeId' });
    //Employees.belongsTo(Employees, {foreignKey: 'EmployeeId', as: 'EmployeeIdToReportsTo'});

    await sequelize.sync({ force: true });
    /*
    const clientes = await Customers.bulkCreate([
        {FirstName: 'David', LastName: 'Calderón', Company: 'Pirata', Address: 'Juan N. Mendez #185 Amp. Lazaro Cardenas', City: 'Culiacán', State: 'Sinaloa', Country: 'México', PostalCode: '80290', Phone: '6677196055', Email: 'davidcalderon700@gmail.com', SupportRepId: 1}
    ]);*/
    const artistas= await Artists.bulkCreate([
        {Name: 'Calibre 50'},
        {Name: 'Banda El Recodo de Cruz Lizarrága'},
        {Name: 'Banda MS de Sergio Lizarrága'},
        {Name: 'La Adictiva Banda San José de Mesillas'},
        {Name: 'Abraham Vazquez'},
        {Name: 'Los Plebes del Rancho de Ariel Camacho'},
        {Name: 'Gerardo Ortiz'},
        {Name: 'Wisin & Yandel'},
        {Name: 'Pitbull'},
        {Name: 'Dinamicos Jrs'},
        {Name: 'Jesse & Joy'},
        {Name: 'Intocable'},
        {Name: 'J Balvin'},
        {Name: 'Palomo'},
        {Name: 'Panda'},
        {Name: 'Christian Nodal'},
        {Name: 'Calle 13'},
        {Name: 'Diferente Nivel'},
        {Name: 'Los Tigres del Norte'},
        {Name: 'Los Tucanes de Tijuana'}
    ]);
    
    const Artalbums = await Albums.bulkCreate([
        {Title: 'Con Todas las Fuerzas', ArtistId: 2},
        {Title: 'Entre los Que Quieran', ArtistId: 17},
        {Title: 'Tr3s Presents MTV Unplugged: Los Tigres del Norte and Friends', ArtistId: 19},
        {Title: 'Sigo Siendo Diferente', ArtistId: 18},
        {Title: 'MTV Unplugged: Panda (En Vivo)', ArtistId: 15},
        {Title: 'En Peligro de Extinción', ArtistId: 12},
        {Title: 'El Árbol', ArtistId: 20},
        {Title: 'Haciendo Historia', ArtistId: 3},
        {Title: 'Ahora', ArtistId: 16},
        {Title: 'Corridos de Alto Calibre', ArtistId: 1},
        {Title: '45 Éxitos', ArtistId: 14},
        {Title: 'Porque Seguimos Sus Pasos', ArtistId: 10},
        {Title: 'Los Campeones del Pueblo "The Big Leagues"', ArtistId: 8},
        {Title: 'Un Besito Más', ArtistId: 11},
        {Title: 'Lo Que Aprendí de las Calles', ArtistId: 5},
        {Title: 'Disfruté Engañarte', ArtistId: 4},
        {Title: 'Recuerden Mi Estilo', ArtistId: 6},
        {Title: 'Planet Pit', ArtistId: 9},
        {Title: 'Comeré Callado Vol. 1', ArtistId: 7},
        {Title: 'Vibras', ArtistId: 13}
    ]);

    const generos = await Genres.bulkCreate([
        {Name: 'Regional Mexicano'},
        {Name: 'Urbano Latino'},
        {Name: 'Rock'},
        {Name: 'Banda'},
        {Name: 'Pop en español'},
        {Name: 'Norteño'},
        {Name: 'Pop'},
        {Name: 'Regional Mexicano Campirano'}
        
    ]);

    const tipomedia = await Media_types.bulkCreate([
        {Name: 'Audio'},
        {Name: 'Video y Audio'}
    ]);

    const empleados = await Employees.bulkCreate([
        
        {LastName:'Fuller', FirstName: 'Andrew', Title: 'Boss', BirthDate: '1952-02-19', HireDate: '1992-08-14', Address:'908 W. Capital Way', ReportsTo: null},
        {LastName: 'Davolio', FirstName: 'Nancy', Title: 'Manager',BirthDate: '1948-12-08', HireDate: '1992-05-01', Address: '507 - 20th Ave. E.', ReportsTo: 1},
        {LastName:'Dodsworth', FirstName: 'Anne', Title: 'Sales', BirthDate: '1966-01-27', HireDate: '1994-11-15', Address:'7 Houndstooth Rd.', ReportsTo: 4},
        {LastName:'Buchanan', FirstName: 'Steven', Title: 'Sales', BirthDate: '1955-03-04', HireDate: '1993-10-17', Address:'14 Garrett Hill', ReportsTo: 1},
        {LastName:'Suyama', FirstName: 'Michael', Title: 'Manager', BirthDate: '1963-07-02', HireDate: '1993-10-17', Address:'Coventry House Miner Rd.', ReportsTo: 2}

    ]);

    const clientes = await Customers.bulkCreate([
        {LastName: 'María', FirstName: 'Anders', Company: 'Company1', Address: '12, rue des Bouchers', City: 'Marseille', State: 'Marseille', Country: 'France', PostalCode: '13008', Phone: '91.24.45.40', Email: 'example.client.1@outlook.com', SupportRepId: 3},
        {LastName: 'Ana', FirstName: 'Trujillo', Company: 'Company2', Address: '23 Tsawassen Blvd.', City: 'Tsawassen', State: 'Vancouver', Country: 'Canada', PostalCode: 'T2F 8M4', Phone: '(604) 555-4729', Email: 'example.client21@outlook.com', SupportRepId: 5},
        {LastName: 'Antonio', FirstName: 'Moreno', Company: 'Company3', Address: 'Fauntleroy Circus', City: 'London', State: 'London', Country: 'UK', PostalCode: 'EC2 5NT', Phone: '(171) 555-1212', Email: 'example.client.3@outlook.com', SupportRepId: 5},
        {LastName: 'Thomas', FirstName: 'Hardy', Company: 'Company4', Address: 'Sierras de Granada 9993', City: 'México D.F.', State: 'CDMX', Country: 'México', PostalCode: '05022', Phone: '(5) 555-3392', Email: 'example.client.4@outlook.com', SupportRepId: 5},
        {LastName: 'Hanna', FirstName: 'Moos', Company: 'Company5', Address: 'Av. dos Lusíadas, 23', City: 'Sao Paulo', State: 'Sao Paulo', Country: 'Brazil', PostalCode: '05432-043', Phone: '(11) 555-7647', Email: 'example.client.5@outlook.com', SupportRepId: 5},
        {LastName: 'Martín', FirstName: 'Sommer', Company: 'Company6', Address: 'Berkeley Gardens 12  Brewery', City: 'London', State: 'London', Country: 'UK', PostalCode: 'WX1 6LT', Phone: '(171) 555-2282', Email: 'example.client.6@outlook.com', SupportRepId: 3},
        {LastName: 'Elizabeth', FirstName: 'Lincoln', Company: 'Company7', Address: '67, rue des Cinquante Otages', City: 'Nantes', State: 'Nantes', Country: 'France', PostalCode: '44000', Phone: '40.67.88.88', Email: 'example.client.7@outlook.com', SupportRepId: 5},
        {LastName: 'Victoria', FirstName: 'Ashworth', Company: 'Company8', Address: '35 King George', City: 'London', State: 'London', Country: 'UK', PostalCode: 'WX3 6FW', Phone: '(171) 555-0297', Email: 'example.client.8@outlook.com', SupportRepId: 3},
        {LastName: 'Patricio', FirstName: 'Simpson', Company: 'Company9', Address: 'Rua Orós, 92', City: 'Sao Paulo', State: 'Sao Paulo', Country: 'Brazil', PostalCode: '05442-030', Phone: '(11) 555-9857', Email: 'example.client.9@outlook.com', SupportRepId: 3},
        {LastName: 'Yang', FirstName: 'Wang', Company: 'Company10', Address: 'C/ Moralzarzal, 86', City: 'Madrid', State: 'Madrid', Country: 'Spain', PostalCode: '28034', Phone: '(91) 555 94 44', Email: 'example.client.10@outlook.com', SupportRepId: 5}
    ]);

    const facturas = await Invoices.bulkCreate([
        {InvoiceDate: '2020-04-01', BillingAdress: 'Direcion de facturación', BillingCity: 'London', CustomerId: 3},
        {InvoiceDate: '2020-04-02', BillingAdress: 'Direccion de facturación', BillingCity: 'London', CustomerId: 3},
        {InvoiceDate: '2020-04-03', BillingAdress: 'Direccion de facturación', BillingCity: 'Spain', CustomerId: 2},
        {InvoiceDate: '2020-04-04', BillingAdress: 'Direccion de facturación', BillingCity: 'CDMX', CustomerId: 2},
        {InvoiceDate: '2020-04-05', BillingAdress: 'Direccion de facturación', BillingCity: 'Sao Paulo', CustomerId: 7},
        {InvoiceDate: '2020-04-06', BillingAdress: 'Direccion de facturación', BillingCity: 'France', CustomerId: 7},
        {InvoiceDate: '2020-04-08', BillingAdress: 'Direccion de facturación', BillingCity: 'CDMX', CustomerId: 9},
        {InvoiceDate: '2020-04-09', BillingAdress: 'Direccion de facturación', BillingCity: 'Sao Paulo', CustomerId: 9},
        {InvoiceDate: '2020-04-10', BillingAdress: 'Direccion de facturación', BillingCity: 'Spain', CustomerId: 1},
        {InvoiceDate: '2020-04-11', BillingAdress: 'Direccion de facturación', BillingCity: 'CDMX', CustomerId: 1},
        {InvoiceDate: '2020-04-12', BillingAdress: 'Direccion de facturación', BillingCity: 'CDMX', CustomerId: 4},
        {InvoiceDate: '2020-04-13', BillingAdress: 'Direccion de facturación', BillingCity: 'France', CustomerId: 4},
        {InvoiceDate: '2020-04-14', BillingAdress: 'Direccion de facturación', BillingCity: 'Sao Paulo', CustomerId: 6},
        {InvoiceDate: '2020-04-15', BillingAdress: 'Direccion de facturación', BillingCity: 'France', CustomerId: 6},
        {InvoiceDate: '2020-04-16', BillingAdress: 'Direccion de facturación', BillingCity: 'Sao Paulo', CustomerId: 8},
        {InvoiceDate: '2020-04-17', BillingAdress: 'Direccion de facturación', BillingCity: 'Spain', CustomerId: 8},
        {InvoiceDate: '2020-04-18', BillingAdress: 'Direccion de facturación', BillingCity: 'France ', CustomerId: 5},
        {InvoiceDate: '2020-04-19', BillingAdress: 'Direccion de facturación', BillingCity: 'Spain', CustomerId: 5},
        {InvoiceDate: '2020-04-20', BillingAdress: 'Direccion de facturación', BillingCity: 'France', CustomerId: 10},
        {InvoiceDate: '2020-04-21', BillingAdress: 'Direccion de facturación', BillingCity: 'Spain', CustomerId: 10}
    ]);

    const canciones = Tracks.bulkCreate([
    {Name: 'Javier de los llanos', Composer: 'Eden Muñoz', Milliseconds: 10800, Bytes: 5242880, UnitPrice: 12.00, MediaTypeId: 1, GenresId: 6, AlbumId: 10 },
    {Name: 'Comencé de cero', Composer: 'Fer Muñoz', Milliseconds: 11520, Bytes: 894742695, UnitPrice: 15.00, MediaTypeId: 1, GenresId: 6, AlbumId: 10},
    {Name: 'Corrido de Feliciano', Composer: ' Calibre 50', Milliseconds: 12537, Bytes: 93759369, UnitPrice: 17.00, MediaTypeId: 1, GenresId: 6, AlbumId: 10},
    {Name: 'Se quedaron a tres pasos', Composer: 'Eden Muñoz', Milliseconds: 9874, Bytes: 58603769, UnitPrice: 22.50, MediaTypeId: 1, GenresId: 6, AlbumId: 10},
    {Name: 'El Inmigrante', Composer: 'Calibre 50', Milliseconds: 19467, Bytes: 76840476, UnitPrice: 9.00, MediaTypeId: 1, GenresId: 6, AlbumId: 10},
    
    {Name: 'Baile de los pobres', Composer: 'René', Milliseconds: 18475, Bytes: 947793764, UnitPrice: 16.00, MediaTypeId: 1, GenresId: 2, AlbumId: 2},
    {Name: 'La vuelta al mundo', Composer: 'René', Milliseconds: 12348, Bytes: 84673849, UnitPrice: 20.00, MediaTypeId: 1, GenresId: 2, AlbumId: 2},
    {Name: 'Vamo a portano mal', Composer: 'René', Milliseconds: 10276, Bytes: 82847493, UnitPrice: 18.00, MediaTypeId: 1, GenresId: 2, AlbumId: 2},
    {Name: 'Muerte en Hawaii', Composer: 'René', Milliseconds: 11837, Bytes: 87639443, UnitPrice: 19.00, MediaTypeId: 1, GenresId: 2, AlbumId: 2},
    {Name: 'El Hormiguero', Composer: 'René', Milliseconds: 13987, Bytes: 87236674, UnitPrice: 11.00, MediaTypeId: 1, GenresId: 2, AlbumId: 2},
    
    {Name: 'Nuestra Aflicción (MTV Unplugged)', Composer: 'José Madero', Milliseconds: 12874, Bytes: 87489498, UnitPrice: 15.00, MediaTypeId: 2, GenresId: 3, AlbumId: 5},
    {Name: 'Solo a Terceros (MTV Unplugged)', Composer: 'José Madero', Milliseconds: 18274, Bytes: 98489534, UnitPrice: 10.00, MediaTypeId: 2, GenresId: 3, AlbumId: 5},
    {Name: 'Los Malaventurados No Lloran (MTV Unplugged)', Composer: 'José Madero', Milliseconds: 12651, Bytes: 98437349, UnitPrice: 25.00, MediaTypeId: 2, GenresId: 3, AlbumId: 5},
    {Name: 'Felizz Cumpleaños (MTV Unplugged)', Composer: 'José Madero', Milliseconds: 12984, Bytes: 89435890, UnitPrice: 22.00, MediaTypeId: 2, GenresId: 3, AlbumId: 5},
    {Name: 'Narcisisita Por Excelencia (MTV Unplugged)', Composer: 'José Madero', Milliseconds: 12847, Bytes: 174387809, UnitPrice: 17.00, MediaTypeId: 2, GenresId: 3, AlbumId: 5},

    {Name: 'Tiempos Mejores', Composer: 'Juan Lugo', Milliseconds: 14132, Bytes: 61329847, UnitPrice: 20.00, MediaTypeId: 1, GenresId: 6, AlbumId: 4},
    {Name: 'El Zurdo', Composer: 'Juan Lugo', Milliseconds: 12097, Bytes: 32874232, UnitPrice: 20.00, MediaTypeId: 1, GenresId: 6, AlbumId: 4},
    {Name: 'El que era humillado', Composer: 'Juan Lugo', Milliseconds: 21762, Bytes: 83247802, UnitPrice: 20.00, MediaTypeId: 1, GenresId: 6, AlbumId: 4},
    {Name: 'Ya tengo rato', Composer: 'Juan Lugo', Milliseconds: 28174, Bytes: 43287482, UnitPrice: 20.00, MediaTypeId: 1, GenresId: 6, AlbumId: 4},
    {Name: 'Sin Temores', Composer: 'Juan Lugo', Milliseconds: 12834, Bytes: 98237432, UnitPrice: 20.00, MediaTypeId: 1, GenresId: 6, AlbumId: 4},

    {Name: 'Consecuencias De Mis Actos', Composer: 'Horacio Palencia', Milliseconds: 12358, Bytes: 87630833, UnitPrice: 23.00, MediaTypeId: 1, GenresId: 4, AlbumId: 8},
    {Name: 'Somos Ajenos', Composer: 'Horacio Palencia', Milliseconds: 29033, Bytes: 32889374, UnitPrice: 23.00, MediaTypeId: 1, GenresId: 4, AlbumId: 8},
    {Name: 'Entonces Qué Somos', Composer: 'Horacio Palencia', Milliseconds: 32198, Bytes: 98734874, UnitPrice: 23.00, MediaTypeId: 1, GenresId: 4, AlbumId: 8},
    {Name: 'Me Gustas Mucho', Composer: 'Horacio Palencia', Milliseconds: 13283, Bytes: 98723474, UnitPrice: 23.00, MediaTypeId: 1, GenresId: 4, AlbumId: 8},
    {Name: 'Llegaste', Composer: 'Horacio Palencia', Milliseconds: 12398, Bytes: 23876324, UnitPrice: 23.00, MediaTypeId: 1, GenresId: 4, AlbumId: 8},

    {Name: 'Nada Nuevo', Composer: 'Christial Nodal', Milliseconds: 12847, Bytes: 98736432, UnitPrice: 18.00, MediaTypeId: 1, GenresId: 1, AlbumId: 9},
    {Name: '¿Quién Es Usted?', Composer: 'Christial Nodal', Milliseconds: 19837, Bytes: 93498742, UnitPrice: 13.00, MediaTypeId: 1, GenresId: 1, AlbumId: 9},
    {Name: 'El Dolor Con El Licor', Composer: 'Christial Nodal', Milliseconds: 19767, Bytes: 99347842, UnitPrice: 14.00, MediaTypeId: 1, GenresId: 1, AlbumId: 9},
    {Name: 'Esta Noche', Composer: 'Christial Nodal', Milliseconds: 34347, Bytes: 94874392, UnitPrice: 18.00, MediaTypeId: 1, GenresId: 1, AlbumId: 9},
    {Name: 'Para Olvidarme', Composer: 'Christial Nodal', Milliseconds: 19877, Bytes: 94398323, UnitPrice: 19.00, MediaTypeId: 1, GenresId: 1, AlbumId: 9},
    
    {Name: 'Mejor Me Alejo', Composer: 'Sergio Lizárraga', Milliseconds: 12384, Bytes: 87643294, UnitPrice: 24.00, MediaTypeId: 2, GenresId: 4, AlbumId: 1},
    {Name: 'Como Dejo De Quererte', Composer: 'Sergio Lizárraga', Milliseconds: 32487, Bytes: 38276424, UnitPrice: 21.00, MediaTypeId: 2, GenresId: 4, AlbumId: 1},
    {Name: 'Prefiero Perderte', Composer: 'Sergio Lizárraga', Milliseconds: 23489, Bytes: 38274238, UnitPrice: 22.00, MediaTypeId: 2, GenresId: 4, AlbumId: 1},
    {Name: 'No Te Imaginas', Composer: 'Sergio Lizárraga', Milliseconds: 13894, Bytes: 32487372, UnitPrice: 24.00, MediaTypeId: 2, GenresId: 4, AlbumId: 1},
    {Name: 'No Elegí Conocerte', Composer: 'Sergio Lizárraga', Milliseconds: 12934, Bytes: 42397242, UnitPrice: 29.00, MediaTypeId: 2, GenresId: 4, AlbumId: 1},
    

    {Name: 'La Jaula De Oro (feat. Juanes)', Composer: 'Jose Hernandéz', Milliseconds: 12354, Bytes: 86398432, UnitPrice: 13.00, MediaTypeId: 2, GenresId: 1, AlbumId: 3},
    {Name: 'América (feat. Calle 13)', Composer: 'Jose Hernandéz', Milliseconds: 12837, Bytes: 87326498, UnitPrice: 11.00, MediaTypeId: 1, GenresId: 1, AlbumId: 3},
    {Name: 'Lagrímas Del Corazón', Composer: 'Jose Hernandéz', Milliseconds: 23498, Bytes: 98347344, UnitPrice: 14.00, MediaTypeId: 2, GenresId: 1, AlbumId: 3},
    {Name: 'Golpes En el Corazón', Composer: 'Jose Hernandéz', Milliseconds: 13294, Bytes: 98327474, UnitPrice: 19.00, MediaTypeId: 2, GenresId: 1, AlbumId: 3},
    {Name: 'Contrabando y Traición', Composer: 'Jose Hernandéz', Milliseconds: 12384, Bytes: 98732434, UnitPrice: 18.00, MediaTypeId: 1, GenresId: 1, AlbumId: 3},
    
    {Name: 'El Árbol', Composer: 'Mario Quintero', Milliseconds: 12355, Bytes: 98764774, UnitPrice: 25.00, MediaTypeId: 2, GenresId: 6, AlbumId: 7},
    {Name: 'El Tres Letras', Composer: 'Mario Quintero', Milliseconds: 18237, Bytes: 87326453, UnitPrice: 20.00, MediaTypeId: 1, GenresId: 6, AlbumId: 7},
    {Name: 'La Perra', Composer: 'Mario Quintero', Milliseconds: 12387, Bytes: 98473424, UnitPrice: 24.00, MediaTypeId: 1, GenresId: 6, AlbumId: 7},
    {Name: 'El Puma', Composer: 'Mario Quintero', Milliseconds: 19837, Bytes: 89764352, UnitPrice: 20.00, MediaTypeId: 1, GenresId: 6, AlbumId: 7},
    {Name: 'El Guicho', Composer: 'Mario Quintero', Milliseconds: 23874, Bytes: 87341635, UnitPrice: 22.00, MediaTypeId: 1, GenresId: 6, AlbumId: 7},
    
    {Name: 'Niña De Mi Corazón', Composer: 'René Camacho', Milliseconds: 12389, Bytes: 87649894, UnitPrice: 21.00, MediaTypeId: 1, GenresId: 4, AlbumId: 11},
    {Name: 'Y Que Quede Claro', Composer: 'René Camacho', Milliseconds: 23872, Bytes: 98732646, UnitPrice: 14.00, MediaTypeId: 1, GenresId: 4, AlbumId: 11},
    {Name: 'El Final De Nuestra Historia', Composer: 'René Camacho', Milliseconds: 21398, Bytes: 87326438, UnitPrice: 17.00, MediaTypeId: 1, GenresId: 4, AlbumId: 11},
    {Name: 'Ya Es Muy Tarde', Composer: 'René Camacho', Milliseconds: 19837, Bytes: 98734642, UnitPrice: 18.00, MediaTypeId: 1, GenresId: 4, AlbumId: 11},
    {Name: 'Mi Segunda Vida', Composer: 'René Camacho', Milliseconds: 12893, Bytes: 87326498, UnitPrice: 29.00, MediaTypeId: 1, GenresId: 4, AlbumId: 11},

    {Name: 'De Ciudaad Al Rancho', Composer: 'Agustín Flores', Milliseconds: 12394, Bytes: 98326423, UnitPrice: 10.00, MediaTypeId: 1, GenresId: 6, AlbumId: 12},
    {Name: 'La Mujer De Mi Vida', Composer: 'Ricardo Velarde', Milliseconds: 12384, Bytes: 42398743, UnitPrice: 19.00, MediaTypeId: 1, GenresId: 6, AlbumId: 12},
    {Name: 'Mi Lema', Composer: 'Agustín Flores', Milliseconds: 12394, Bytes: 87326484, UnitPrice: 15.00, MediaTypeId: 1, GenresId: 6, AlbumId: 12},
    {Name: 'El Consentido De Dios', Composer: 'Ricardo Velarde', Milliseconds: 12983, Bytes: 98327448, UnitPrice: 14.00, MediaTypeId: 1, GenresId: 6, AlbumId: 12},
    {Name: 'El Cruce Seguro', Composer: 'Agustín Flores', Milliseconds: 12398, Bytes: 328746749, UnitPrice: 25.00, MediaTypeId: 1, GenresId: 6, AlbumId: 12},
    
    {Name: '3 A.M. (feat. Tommy Torres)', Composer: 'Jesse & Joy', Milliseconds: 12984, Bytes: 89746239, UnitPrice: 10.00, MediaTypeId: 1, GenresId: 5, AlbumId: 14},
    {Name: 'Dueles', Composer: 'Jesse & Joy', Milliseconds: 11293, Bytes: 98327483, UnitPrice: 13.00, MediaTypeId: 1, GenresId: 5, AlbumId: 14},
    {Name: 'Me Soltaste', Composer: 'Jesse & Joy', Milliseconds: 12897, Bytes: 23908732, UnitPrice: 18.00, MediaTypeId: 1, GenresId: 5, AlbumId: 14},
    {Name: 'Ecos De Amor', Composer: 'Jesse & Joy', Milliseconds: 10923, Bytes: 92873643, UnitPrice: 20.00, MediaTypeId: 1, GenresId: 5, AlbumId: 14},
    {Name: 'Que Pena Me Da', Composer: 'Jesse & Joy', Milliseconds: 13872, Bytes: 98763264, UnitPrice: 18.00, MediaTypeId: 1, GenresId: 5, AlbumId: 14},


    {Name: 'Vibras', Composer: 'J Balvin', Milliseconds: 12387, Bytes: 98324876, UnitPrice: 20.00, MediaTypeId: 1, GenresId: 2, AlbumId: 20},
    {Name: 'Mi Gente', Composer: 'J Balvin', Milliseconds: 12389, Bytes: 87643565, UnitPrice: 25.00, MediaTypeId: 1, GenresId: 2, AlbumId: 20},
    {Name: 'No Es Justo', Composer: 'J Balvin', Milliseconds: 12837, Bytes: 98632456, UnitPrice: 29.00, MediaTypeId: 1, GenresId: 2, AlbumId: 20},
    {Name: 'En Mi', Composer: 'J Balvin', Milliseconds: 12398, Bytes: 87236465, UnitPrice: 27.00, MediaTypeId: 1, GenresId: 2, AlbumId: 20},
    {Name: 'Brillo', Composer: 'J Balvin', Milliseconds: 12389, Bytes: 98623474, UnitPrice: 12.00, MediaTypeId: 1, GenresId: 2, AlbumId: 20},


    {Name: 'Dímelo', Composer: 'Ricky Muñoz', Milliseconds: 12987, Bytes: 87126349, UnitPrice: 18.00, MediaTypeId: 1, GenresId: 1, AlbumId: 6},
    {Name: 'Y Te Vas', Composer: 'Ricky Muñoz', Milliseconds: 12387, Bytes: 89137464, UnitPrice: 22.00, MediaTypeId: 1, GenresId: 1, AlbumId: 6},
    {Name: 'Se Acabó Tu Fe', Composer: 'Ricky Muñoz', Milliseconds: 18973, Bytes: 87361426, UnitPrice: 21.00, MediaTypeId: 1, GenresId: 1, AlbumId: 6},
    {Name: 'Como Se Olvida', Composer: 'Ricky Muñoz', Milliseconds: 12736, Bytes: 98723646, UnitPrice: 11.00, MediaTypeId: 1, GenresId: 1, AlbumId: 6},
    {Name: 'No Será Tarde', Composer: 'Ricky Muñoz', Milliseconds: 12873, Bytes: 98273467, UnitPrice: 8.00, MediaTypeId: 1, GenresId: 1, AlbumId: 6},

    {Name: 'Aullando', Composer: 'Wisin & Yandel', Milliseconds: 12987, Bytes: 98731423, UnitPrice: 20.00, MediaTypeId: 1, GenresId: 2, AlbumId: 13},
    {Name: 'Tu Tienes Algo', Composer: 'Wisin & Yandel', Milliseconds: 21983, Bytes: 76153673, UnitPrice: 28.00, MediaTypeId: 1, GenresId: 2, AlbumId: 13},
    {Name: 'La Luz', Composer: 'Wisin & Yandel', Milliseconds: 12837, Bytes: 98263483, UnitPrice: 10.00, MediaTypeId: 1, GenresId: 2, AlbumId: 13},
    {Name: 'Mi Intención', Composer: 'Wisin & Yandel', Milliseconds: 12987, Bytes: 98732642, UnitPrice: 23.00, MediaTypeId: 1, GenresId: 2, AlbumId: 13},
    {Name: 'Guaya', Composer: 'Wisin & Yandel', Milliseconds: 12212, Bytes: 98762346, UnitPrice: 12.00, MediaTypeId: 1, GenresId: 2, AlbumId: 13},

    {Name: 'DEL Negociante', Composer: 'Ariel Camacho', Milliseconds: 29834, Bytes: 98239474, UnitPrice: 25.00, MediaTypeId: 1, GenresId: 8, AlbumId: 17},
    {Name: 'Mi Riqueza', Composer: 'Ariel Camacho', Milliseconds: 19283, Bytes: 81762363, UnitPrice: 25.00, MediaTypeId: 1, GenresId: 8, AlbumId: 17},
    {Name: 'El Mentado', Composer: 'Ariel Camacho', Milliseconds: 18792, Bytes: 98172636, UnitPrice: 25.00, MediaTypeId: 1, GenresId: 8, AlbumId: 17},
    {Name: 'No Lo Hice Bien', Composer: 'José Manuel', Milliseconds: 13763, Bytes: 98762136, UnitPrice: 25.00, MediaTypeId: 1, GenresId: 8, AlbumId: 17},
    {Name: 'Ya Lo Superé', Composer: 'Ariel Camacho', Milliseconds: 12983, Bytes: 32668042, UnitPrice: 25.00, MediaTypeId: 1, GenresId: 8, AlbumId: 17},
    
    
    {Name: 'Se Ocupan Huevos', Composer: 'Abraham Vazquez', Milliseconds: 12354, Bytes: 93287466, UnitPrice: 14.00, MediaTypeId: 1, GenresId: 8, AlbumId: 15},
    {Name: 'Días Buenos, Días Malos', Composer: 'Abraham Vazquez', Milliseconds: 13245, Bytes: 32398274, UnitPrice: 14.00, MediaTypeId: 1, GenresId: 8, AlbumId: 15},
    {Name: 'El Brown', Composer: 'Abraham Vazquez', Milliseconds: 86235, Bytes: 23874663, UnitPrice: 14.00, MediaTypeId: 1, GenresId: 8, AlbumId: 15},
    {Name: 'La Señora de la Coca', Composer: 'Abraham Vazquez', Milliseconds: 23746, Bytes: 39827474, UnitPrice: 14.00, MediaTypeId: 1, GenresId: 8, AlbumId: 15},
    {Name: 'El EStudiante', Composer: 'Abraham Vazquez', Milliseconds: 32874, Bytes: 87324876, UnitPrice: 14.00, MediaTypeId: 1, GenresId: 8, AlbumId: 15},
    
    {Name: 'El Ivansillo', Composer: 'Gerardo Ortiz', Milliseconds: 12498, Bytes: 87634743, UnitPrice: 19.00, MediaTypeId: 2, GenresId: 6, AlbumId: 19},
    {Name: 'Estoy Mejor', Composer: 'Gerardo Ortiz', Milliseconds: 12348, Bytes: 87632489, UnitPrice: 12.00, MediaTypeId: 2, GenresId: 6, AlbumId: 19},
    {Name: 'Para Qué Lastimarme', Composer: 'Gerardo Ortiz', Milliseconds: 23148, Bytes: 67457394, UnitPrice: 19.00, MediaTypeId: 2, GenresId: 6, AlbumId: 19},
    {Name: 'Palma Salazar', Composer: 'Gerardo Ortiz', Milliseconds: 12983, Bytes: 29837483, UnitPrice: 15.00, MediaTypeId: 1, GenresId: 6, AlbumId: 19},
    {Name: 'El Regreso del JT', Composer: 'Gerardo Ortiz', Milliseconds: 12394, Bytes: 87234638, UnitPrice: 20.00, MediaTypeId: 1, GenresId: 6, AlbumId: 19},
    
    {Name: 'Disfruté Engañarte', Composer: 'Memo Garza', Milliseconds: 12948, Bytes: 91283747, UnitPrice: 15.00, MediaTypeId: 1, GenresId: 4, AlbumId: 16},
    {Name: 'Hombre Libre', Composer: 'Memo Garza', Milliseconds: 12843, Bytes: 12398747, UnitPrice: 19.00, MediaTypeId: 1, GenresId: 4, AlbumId: 16},
    {Name: 'Después De Ti ¿Quién?', Composer: 'Memo Garza', Milliseconds: 13928, Bytes: 23987474, UnitPrice: 15.00, MediaTypeId: 1, GenresId: 4, AlbumId: 16},
    {Name: 'Un Fin en Culiacán', Composer: 'Memo Garza', Milliseconds: 12983, Bytes: 92871340, UnitPrice: 14.00, MediaTypeId: 1, GenresId: 4, AlbumId: 16},
    {Name: 'Nadie', Composer: 'Memo Garza', Milliseconds: 19238, Bytes: 12039478, UnitPrice: 10.00, MediaTypeId: 1, GenresId: 4, AlbumId: 16},

    {Name: 'Give me Everithing (feat. Ne-Yo, Afrojack & Nayer)', Composer: 'Pitt Bull', Milliseconds: 12398, Bytes: 32984739, UnitPrice: 19.00, MediaTypeId: 2, GenresId: 2, AlbumId: 18},
    {Name: 'International Love (feat. Chris Brown)', Composer: 'Pitt Bull', Milliseconds: 23184, Bytes: 98237498, UnitPrice: 17.00, MediaTypeId: 2, GenresId: 2, AlbumId: 18},
    {Name: 'My Kinda Girls (feat. Nelly)', Composer: 'Pitt Bull', Milliseconds: 28973, Bytes: 98327474, UnitPrice: 10.00, MediaTypeId: 2, GenresId: 2, AlbumId: 18},
    {Name: 'Pause', Composer: 'Pitt Bull', Milliseconds: 12387, Bytes: 98123646, UnitPrice: 14.00, MediaTypeId: 2, GenresId: 2, AlbumId: 18},
    {Name: 'Come n go (feat. Enrique Iglesias)', Composer: 'Pitt Bull', Milliseconds: 28743, Bytes: 98263474, UnitPrice: 10.00, MediaTypeId: 2, GenresId: 2, AlbumId: 18}
    
    //{Name: '', Composer: '', Milliseconds: , Bytes: , UnitPrice: , MediaTypeId: , GenresId: , AlbumId: },

    ]);
    
    const listadereproduccion = Playlists.bulkCreate([
        {Name: 'Corridos'},
        {Name: 'Pop'},
        {Name: 'Electro'},
        {Name: 'Pa la peda'},
        {Name: 'Banqueteras'},
        {Name: 'Rock'},
        {Name: 'Dolidas'},
        {Name: 'Viejitas pero bonitas'},
        {Name: 'Clásicas'},
        {Name: 'Narco Corridos'},
        {Name: 'Corridos Verdes'},
        {Name: 'Guitarras'},
        {Name: 'Banditas'},
        {Name: 'Pa Perrear'},
        {Name: 'Mix1'},
        {Name: 'Mix2'},
        {Name: 'Mix3'},
        {Name: 'Mix4'},
        {Name: 'Mix5'},
        {Name: 'Lo que caiga'}
    ]);

    const playlistrack = Playlists_track.bulkCreate([
        {PlaylistId: 1, TrackId: 86},
        {PlaylistId: 1, TrackId: 89},
        {PlaylistId: 1, TrackId: 76},
        
        {PlaylistId: 2, TrackId: 56},
        {PlaylistId: 2, TrackId: 59},
        {PlaylistId: 2, TrackId: 60},

        {PlaylistId: 3, TrackId: 100},
        {PlaylistId: 3, TrackId: 97},
        {PlaylistId: 3, TrackId: 96},
        
        {PlaylistId: 4, TrackId: 77},
        {PlaylistId: 4, TrackId: 80},
        {PlaylistId: 4, TrackId: 91},
                
        {PlaylistId: 5, TrackId: 94},
        {PlaylistId: 5, TrackId: 91},
        {PlaylistId: 5, TrackId: 36},
                
        {PlaylistId: 6, TrackId: 11},
        {PlaylistId: 6, TrackId: 12},
        {PlaylistId: 6, TrackId: 15},
                
        {PlaylistId: 7, TrackId: 88},
        {PlaylistId: 7, TrackId: 93},
        {PlaylistId: 7, TrackId: 59},
                
        {PlaylistId: 8, TrackId: 51},
        {PlaylistId: 8, TrackId: 66},
        {PlaylistId: 8, TrackId: 9},
                
        {PlaylistId: 9, TrackId: 76},
        {PlaylistId: 9, TrackId: 66},
        {PlaylistId: 9, TrackId: 96},
                
        {PlaylistId: 10, TrackId: 41},
        {PlaylistId: 10, TrackId: 3},
        {PlaylistId: 10, TrackId: 4},
                
        {PlaylistId: 11, TrackId: 86},
        {PlaylistId: 11, TrackId: 89},
        {PlaylistId: 11, TrackId: 81},
                
        {PlaylistId: 12, TrackId: 77},
        {PlaylistId: 12, TrackId: 79},
        {PlaylistId: 12, TrackId: 81},
                
        {PlaylistId: 13, TrackId: 92},
        {PlaylistId: 13, TrackId: 46},
        {PlaylistId: 13, TrackId: 35},
                
        {PlaylistId: 14, TrackId: 63},
        {PlaylistId: 14, TrackId: 61},
        {PlaylistId: 14, TrackId: 65},
                
        {PlaylistId: 15, TrackId: 1},
        {PlaylistId: 15, TrackId: 6},
        {PlaylistId: 15, TrackId: 80},
                
        {PlaylistId: 16, TrackId: 54},
        {PlaylistId: 16, TrackId: 23},
        {PlaylistId: 16, TrackId: 98},
                
        {PlaylistId: 17, TrackId: 23},
        {PlaylistId: 17, TrackId: 34},
        {PlaylistId: 17, TrackId: 65},
                
        {PlaylistId: 18, TrackId: 67},
        {PlaylistId: 18, TrackId: 3},
        {PlaylistId: 18, TrackId: 56},
                
        {PlaylistId: 19, TrackId: 6},
        {PlaylistId: 19, TrackId: 9},
        {PlaylistId: 19, TrackId: 1},
                
        {PlaylistId: 20, TrackId: 4},
        {PlaylistId: 20, TrackId: 62},
        {PlaylistId: 20, TrackId: 18}
    ]);

    const detalle = Invoices_items.bulkCreate([
        {UnitPrice: 15.00, Quantity: 1, InvoiceId: 1, TrackId: 65},
        {UnitPrice: 17.00, Quantity: 3, InvoiceId: 1, TrackId: 69},
        {UnitPrice: 22.00, Quantity: 5, InvoiceId: 1, TrackId: 66},
        {UnitPrice: 10.00, Quantity: 2, InvoiceId: 1, TrackId: 27},
        {UnitPrice: 17.00, Quantity: 1, InvoiceId: 1, TrackId: 34},
        
        {UnitPrice: 15.00, Quantity: 2, InvoiceId: 2, TrackId: 54},
        {UnitPrice: 10.00, Quantity: 6, InvoiceId: 2, TrackId: 2},
        {UnitPrice: 12.00, Quantity: 1, InvoiceId: 2, TrackId: 7},
        {UnitPrice: 14.00, Quantity: 1, InvoiceId: 2, TrackId: 87},
        {UnitPrice: 17.00, Quantity: 1, InvoiceId: 2, TrackId: 12},
        
        {UnitPrice: 20.00, Quantity: 4, InvoiceId: 3, TrackId: 87},
        {UnitPrice: 20.00, Quantity: 3, InvoiceId: 3, TrackId: 65},
        {UnitPrice: 22.00, Quantity: 8, InvoiceId: 3, TrackId: 45},
        {UnitPrice: 25.00, Quantity: 1, InvoiceId: 3, TrackId: 43},
        {UnitPrice: 22.00, Quantity: 1, InvoiceId: 3, TrackId: 92},

        {UnitPrice: 21.00, Quantity: 3, InvoiceId: 4, TrackId: 39},
        {UnitPrice: 22.00, Quantity: 3, InvoiceId: 4, TrackId: 81},
        {UnitPrice: 12.00, Quantity: 1, InvoiceId: 4, TrackId: 37},
        {UnitPrice: 15.00, Quantity: 3, InvoiceId: 4, TrackId: 47},
        {UnitPrice: 16.00, Quantity: 2, InvoiceId: 4, TrackId: 94},
        
        {UnitPrice: 19.00, Quantity: 8, InvoiceId: 5, TrackId: 23},
        {UnitPrice: 18.00, Quantity: 6, InvoiceId: 5, TrackId: 55},
        {UnitPrice: 15.00, Quantity: 9, InvoiceId: 5, TrackId: 77},
        {UnitPrice: 18.00, Quantity: 6, InvoiceId: 5, TrackId: 9},
        {UnitPrice: 12.00, Quantity: 2, InvoiceId: 5, TrackId: 86},
        {UnitPrice: 14.00, Quantity: 1, InvoiceId: 5, TrackId: 53},
        
        {UnitPrice: 13.00, Quantity: 1, InvoiceId: 6, TrackId: 25},
        {UnitPrice: 23.00, Quantity: 1, InvoiceId: 6, TrackId: 69},
        {UnitPrice: 21.00, Quantity: 1, InvoiceId: 6, TrackId: 46},
        {UnitPrice: 15.00, Quantity: 1, InvoiceId: 6, TrackId: 47},
        {UnitPrice: 18.00, Quantity: 1, InvoiceId: 6, TrackId: 14},
        
        {UnitPrice: 20.00, Quantity: 1, InvoiceId: 7, TrackId: 38},
        {UnitPrice: 22.00, Quantity: 1, InvoiceId: 7, TrackId: 79},
        {UnitPrice: 12.00, Quantity: 4, InvoiceId: 7, TrackId: 25},
        {UnitPrice: 25.00, Quantity: 3, InvoiceId: 7, TrackId: 84},
        {UnitPrice: 14.00, Quantity: 2, InvoiceId: 7, TrackId: 100},
        
        {UnitPrice: 14.00, Quantity: 2, InvoiceId: 8, TrackId: 19},
        {UnitPrice: 18.00, Quantity: 3, InvoiceId: 8, TrackId: 46},
        {UnitPrice: 15.00, Quantity: 3, InvoiceId: 8, TrackId: 63},
        {UnitPrice: 9.00, Quantity: 2, InvoiceId: 8, TrackId: 6},
        {UnitPrice: 10.00, Quantity: 1, InvoiceId: 8, TrackId: 72},
        
        {UnitPrice: 19.00, Quantity: 1, InvoiceId: 9, TrackId: 19},
        {UnitPrice: 15.00, Quantity: 1, InvoiceId: 9, TrackId: 84},
        {UnitPrice: 18.00, Quantity: 1, InvoiceId: 9, TrackId: 43},
        {UnitPrice: 25.00, Quantity: 1, InvoiceId: 9, TrackId: 41},
        {UnitPrice: 19.00, Quantity: 1, InvoiceId: 9, TrackId: 49},
        
        {UnitPrice: 25.00, Quantity: 4, InvoiceId: 10, TrackId: 44},
        {UnitPrice: 22.00, Quantity: 2, InvoiceId: 10, TrackId: 88},
        {UnitPrice: 23.00, Quantity: 4, InvoiceId: 10, TrackId: 99},
        {UnitPrice: 12.00, Quantity: 7, InvoiceId: 10, TrackId: 73},
        {UnitPrice: 20.00, Quantity: 4, InvoiceId: 10, TrackId: 35},

        {UnitPrice: 16.00, Quantity: 2, InvoiceId: 11, TrackId: 62},
        {UnitPrice: 15.00, Quantity: 3, InvoiceId: 11, TrackId: 74},
        {UnitPrice: 11.00, Quantity: 1, InvoiceId: 11, TrackId: 82},
        {UnitPrice: 19.00, Quantity: 5, InvoiceId: 11, TrackId: 21},
        {UnitPrice: 10.00, Quantity: 3, InvoiceId: 11, TrackId: 86},

        {UnitPrice: 21.00, Quantity: 3, InvoiceId: 12, TrackId: 3},
        {UnitPrice: 21.00, Quantity: 2, InvoiceId: 12, TrackId: 1},
        {UnitPrice: 21.00, Quantity: 4, InvoiceId: 12, TrackId: 44},
        {UnitPrice: 21.00, Quantity: 3, InvoiceId: 12, TrackId: 36},
        {UnitPrice: 21.00, Quantity: 1, InvoiceId: 12, TrackId: 41},
        
        {UnitPrice: 19.00, Quantity: 3, InvoiceId: 13, TrackId: 3},
        {UnitPrice: 16.00, Quantity: 2, InvoiceId: 13, TrackId: 52},
        {UnitPrice: 14.00, Quantity: 5, InvoiceId: 13, TrackId: 47},
        {UnitPrice: 13.00, Quantity: 6, InvoiceId: 13, TrackId: 85},
        {UnitPrice: 12.00, Quantity: 6, InvoiceId: 13, TrackId: 43},
        
        {UnitPrice: 20.00, Quantity: 8, InvoiceId: 14, TrackId: 32},
        {UnitPrice: 12.00, Quantity: 7, InvoiceId: 14, TrackId: 21},
        {UnitPrice: 25.00, Quantity: 9, InvoiceId: 14, TrackId: 34},
        {UnitPrice: 23.00, Quantity: 10, InvoiceId: 14, TrackId: 80},
        {UnitPrice: 22.00, Quantity: 3, InvoiceId: 14, TrackId: 26},
        
        {UnitPrice: 19.00, Quantity: 4, InvoiceId: 15, TrackId: 19},
        {UnitPrice: 15.00, Quantity: 2, InvoiceId: 15, TrackId: 89},
        {UnitPrice: 25.00, Quantity: 2, InvoiceId: 15, TrackId: 42},
        {UnitPrice: 25.00, Quantity: 3, InvoiceId: 15, TrackId: 49},
        {UnitPrice: 11.00, Quantity: 4, InvoiceId: 15, TrackId: 38},
        
        {UnitPrice: 26.00, Quantity: 4, InvoiceId: 16, TrackId: 22},
        {UnitPrice: 25.00, Quantity: 4, InvoiceId: 16, TrackId: 69},
        {UnitPrice: 23.00, Quantity: 3, InvoiceId: 16, TrackId: 66},
        {UnitPrice: 20.00, Quantity: 5, InvoiceId: 16, TrackId: 52},
        {UnitPrice: 21.00, Quantity: 1, InvoiceId: 16, TrackId: 73},
        
        {UnitPrice: 11.00, Quantity: 3, InvoiceId: 17, TrackId: 62},
        {UnitPrice: 19.00, Quantity: 2, InvoiceId: 17, TrackId: 63},
        {UnitPrice: 14.00, Quantity: 3, InvoiceId: 17, TrackId: 74},
        {UnitPrice: 12.00, Quantity: 2, InvoiceId: 17, TrackId: 94},
        {UnitPrice: 20.00, Quantity: 1, InvoiceId: 17, TrackId: 90},

        {UnitPrice: 22.00, Quantity: 5, InvoiceId: 18, TrackId: 71},
        {UnitPrice: 23.00, Quantity: 3, InvoiceId: 18, TrackId: 84},
        {UnitPrice: 25.00, Quantity: 2, InvoiceId: 18, TrackId: 41},
        {UnitPrice: 20.00, Quantity: 7, InvoiceId: 18, TrackId: 85},
        {UnitPrice: 24.00, Quantity: 5, InvoiceId: 18, TrackId: 73},
        
        {UnitPrice: 10.00, Quantity: 3, InvoiceId: 19, TrackId: 54},
        {UnitPrice: 14.00, Quantity: 2, InvoiceId: 19, TrackId: 68},
        {UnitPrice: 19.00, Quantity: 6, InvoiceId: 19, TrackId: 92},
        {UnitPrice: 20.00, Quantity: 4, InvoiceId: 19, TrackId: 94},
        {UnitPrice: 21.00, Quantity: 5, InvoiceId: 19, TrackId: 63},

        {UnitPrice: 23.00, Quantity: 3, InvoiceId: 20, TrackId: 55},
        {UnitPrice: 20.00, Quantity: 2, InvoiceId: 20, TrackId: 11},
        {UnitPrice: 25.00, Quantity: 1, InvoiceId: 20, TrackId: 88},
        {UnitPrice: 21.00, Quantity: 3, InvoiceId: 20, TrackId: 46}
    
    ]);

})();

    module.exports = {
        sequelize,
        AuxEmployees,
        AuxArtists, 
        AuxCustomers,
        AuxAlbums,
        AuxGenres,
        AuxInvoices,
        AuxInvoices_Items,
        AuxTracks,
        AuxPlaylist_Tracks,
        AuxPalylists,
        AuxMedia_Types
    }

/*
 Employees,
Invoices,
        Invoices_items,
        Tracks,
        Artists,
        Albums,
        Playlists_track,
        Playlists,
        Media_types,
        Genres
Invoices_items.belongsTo(Invoices, {foreignKey: 'InvoiceId', as: 'Invoices_items'});
Invoices.hasMany(Invoices_items, {foreignKey: 'InvoiceId', as: 'Invoices'});
*/

        /*{InvoiceDate: 2020-04-21, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 5},
        {InvoiceDate: 2020-04-22, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 5},
        {InvoiceDate: 2020-04-23, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 10},
        {InvoiceDate: 2020-04-24, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 10},
        {InvoiceDate: 2020-04-25, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 14},
        {InvoiceDate: 2020-04-26, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 14},
        {InvoiceDate: 2020-04-27, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 8},
        {InvoiceDate: 2020-04-28, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 8},
        {InvoiceDate: 2020-04-29, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 1},
        {InvoiceDate: 2020-04-30, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 1},
        {InvoiceDate: 2020-05-01, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 12},
        {InvoiceDate: 2020-05-02, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 12},
        {InvoiceDate: 2020-05-03, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 16},
        {InvoiceDate: 2020-05-04, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 16},
        {InvoiceDate: 2020-05-05, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 20},
        {InvoiceDate: 2020-05-06, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 20},
        {InvoiceDate: 2020-05-07, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 17},
        {InvoiceDate: 2020-05-08, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 17},
        {InvoiceDate: 2020-05-09, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 18},
        {InvoiceDate: 2020-05-10, BillingAdress: 'Direccion de facturación', BillingCity: ' ', CustomerId: 18}*/