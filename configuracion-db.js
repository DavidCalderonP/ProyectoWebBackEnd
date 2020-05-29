const Sequelize = require("sequelize");
const Model = Sequelize.Model;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'store.sqlite'
});

(async()=>{
    class Customers extends Model {}
    Customers.init({
        CustomerId: {
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
            allowNull: false
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: false
        }/*,
        SupportRepId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }*/
    }, { sequelize, modelName:'Customers' });

    class Employees extends Model {}
    Employees.init({
        EmployeeId: {
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
        Title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ReportsTo: {
            type: Sequelize.INTEGER,
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
        }
    }, {sequelize, modelName:'Employees'});

    class Invoices extends Model {}
    Invoices.init({
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
    }, {sequelize, modelName:'Invoices'});

    class Invoices_items extends Model {}
    Invoices_items.init({
        InvoiceItemId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
    }, {sequelize, modelName:'Invoices_items'});

    class Albums extends Model {}
    Albums.init({
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
    }, {sequelize, modelName:'Albums'});

    class Playlists extends Model {}
    Playlists.init({
        PlaylistId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {sequelize, modelName:'Playlists'});

    class Playlists_track extends Model {}
    Playlists_track.init({
    }, {sequelize, modelName:'Playlists_track'});

    class Tracks extends Model {}
    Tracks.init({
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
    }, {sequelize, modelName:'Tracks'});

    class Artists extends Model {}
    Artists.init({
        ArtistId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {sequelize, modelName:'Artists'});

    class Media_types extends Model {}
    Media_types.init({
        MediaTypeId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {sequelize, modelName:'Media_types'});

    class Genres extends Model {}
    Genres.init({
        GenreId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {sequelize, modelName:'Genres'});

    Albums.belongsTo(Artists,{foreignKey: 'ArtistId', as: 'AlbumsToArtists'});
    Artists.hasMany(Albums, {foreignKey: 'ArtistId', as: 'ArtistsToAlbums'});

    Tracks.belongsToMany(Playlists,{as: 'TracksToPlaylists',through: Playlists_track, foreignKey: 'TrackId'});
    Playlists.belongsToMany(Tracks, {as: 'PlaylistsToTracks', through: Playlists_track, foreignKey: 'PlaylistId'});

    Media_types.hasMany(Tracks, {foreignKey: 'MediaTypeId', as: 'Media_typeToTracks'});
    Tracks.belongsTo(Media_types, {foreignKey: 'MediaTypeId', as: 'TracksToMediatype'});

    Genres.hasMany(Tracks, {foreignKey: 'GenresId', as: 'GenresToTracks'});
    Tracks.belongsTo(Genres, {foreignKey: 'GenresId', as: 'TrakcsToGenres'});

    Invoices.belongsToMany(Tracks, {as: 'Invoices_itemsToTracks',through: Invoices_items, foreignKey: 'TrackId'});
    Tracks.belongsToMany(Invoices, {as: 'TracksToInvoices_items', through: Invoices_items, foreignKey: 'InvoiceId'});

    Albums.hasMany(Tracks, {foreignKey: 'AlbumId', as: 'AlbumsToTracks'});
    Tracks.belongsTo(Albums, {foreignKey: 'AlbumId', as: 'TracksToAlbums'});

    Invoices.belongsTo(Customers, {foreignKey: 'CustomerId', as: 'InvoicesToCustomers'});
    Customers.hasMany(Invoices, {foreignKey: 'CustomerId', as: 'CustomersToInvoices'});

    Employees.hasMany(Customers, {foreignKey: 'SupportRepId', as: 'EmployeesToCustomers'});
    Customers.belongsTo(Employees, {foreignKey: 'SupportRepId', as: 'CustomerstoEmployees'});

    Employees.hasMany(Employees, {foreignKey: 'ReportsTo', as: 'ReportsToToEmployeeId'});
    //Employees.belongsTo(Employees, {foreignKey: 'EmployeeId', as: 'EmployeeIdToReportsTo'});

    await sequelize.sync({force: true});
})();

/*


Invoices_items.belongsTo(Invoices, {foreignKey: 'InvoiceId', as: 'Invoices_items'});
Invoices.hasMany(Invoices_items, {foreignKey: 'InvoiceId', as: 'Invoices'});
*/