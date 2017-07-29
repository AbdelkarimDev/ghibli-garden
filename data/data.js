const UsersData = require('./users.data');
const FilmsData = require('./films.data');
const LocationsData = require('./locations.data');
const PersonsData = require('./persons.data');
const SpeciesData = require('./species.data');
const VehiclesData = require('./vehicles.data');
const seed = require('./seed');

const init = (db) => {
    return Promise.resolve({
        users: new UsersData(db),
        films: new FilmsData(db),
        locations: new LocationsData(db),
        persons: new PersonsData(db),
        species: new SpeciesData(db),
        vehicles: new VehiclesData(db),
        seedDB: seed(db),
    });
};

module.exports = { init };
