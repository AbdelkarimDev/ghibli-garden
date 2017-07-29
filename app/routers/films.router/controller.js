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
        postComment(req, res, id, comment, username) {
           return data.films.postComment(id, comment, username)
                .then((msg) => {
                    req.flash('success', msg);
                    return res.redirect(`/films/${id}`);
                })
                .catch((err) => {
                    req.flash('error', err);
                    return res.redirect('/');
                });
        },
        rateFilm(req, res, id, rating, username) {
            return data.films.rateFilm(id, rating, username)
                .then((msg) => {
                    req.flash('success', msg);
                    return res.redirect(`/films/${id}`);
                })
                .catch((err) => {
                    req.flash('error', err);
                    return res.redirect('/');
                });
        },
    };

    return controller;
};

module.exports = { init };
