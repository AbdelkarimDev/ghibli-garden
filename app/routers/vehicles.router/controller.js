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
        getById(req, res, id) {
            return data.vehicles.findById(id)
                .then((vehicle) => {
                    return res.render('vehicles/single', {
                        context: vehicle,
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };
