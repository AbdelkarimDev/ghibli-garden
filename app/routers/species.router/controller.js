const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.species.getAll()
                .then((species) => {
                    return res.render('species/all', {
                        context: species,
                    });
                });
        },
        getById(req, res, id) {
            return data.species.findById(id)
                .then((species) => {
                    return res.render('species/single', {
                        context: species,
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };
