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
    };

    return controller;
};


module.exports = { init };
