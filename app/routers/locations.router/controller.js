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
    };

    return controller;
};


module.exports = { init };
