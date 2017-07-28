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
    };

    return controller;
};


module.exports = { init };
