const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.locations.getAll()
                .then((films) => {
                    return res.render('locations/all', {
                        context: films,
                    });
                });
        },
        getById(req, res, id) {
            return data.locations.findById(id)
                .then((location) => {
                    return res.render('locations/single', {
                        context: location,
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };
