const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.vehicles.getAll()
                .then((vehicles) => {
                    return res.render('vehicles/all', {
                        context: vehicles,
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };
