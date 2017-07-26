const ItemsData = require('./items.data');
const CategoriesData = require('./categories.data');
const TodosData = require('./todos.data');
const UsersData = require('./users.data');
const SeedData = require('./seed.data');

const init = (db) => {
    return Promise.resolve({
        items: new ItemsData(db),
        todos: new TodosData(db),
        categories: new CategoriesData(db),
        users: new UsersData(db),
        seed: new SeedData(db),
    });
};

module.exports = { init };
