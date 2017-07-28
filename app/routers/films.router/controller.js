const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.films.getAll()
                .then((films) => {
                    // console.log(films);
                    return res.render('films/all', {
                        context: films,
                    });
                });
        },
        getById(req, res, id) {
            return data.films.findById(id)
                .then((film) => {
                    return res.render('films/single', {
                        context: film,
                    });
                });
        },

    };

    return controller;
};


module.exports = { init };
