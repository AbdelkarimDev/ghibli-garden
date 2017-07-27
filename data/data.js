const ItemsData = require('./items.data');
const CategoriesData = require('./categories.data');
const TodosData = require('./todos.data');
const UsersData = require('./users.data');
const FilmsData = require('./films.data');
const LocationsData = require('./locations.data');
const PersonsData = require('./persons.data');
const SpeciesData = require('./species.data');
const VehiclesData = require('./vehicles.data');
const seed = require('./seed');

const init = (db) => {
    return Promise.resolve({
        items: new ItemsData(db),
        todos: new TodosData(db),
        categories: new CategoriesData(db),
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
