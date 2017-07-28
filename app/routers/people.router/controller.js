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
    };

    return controller;
};


module.exports = { init };
