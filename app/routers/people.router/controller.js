const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.persons.getAll()
                .then((people) => {
                    return res.render('people/all', {
                        context: people,
                    });
                });
        },
        getById(req, res, id) {
            return data.persons.findById(id)
                .then((person) => {
                    return res.render('people/single', {
                        context: person,
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };
