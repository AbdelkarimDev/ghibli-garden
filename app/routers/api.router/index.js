const attachTo = (app, data) => {
    require('./v1/films.api.router').attachTo(app, data);
    require('./v1/people.api.router').attachTo(app, data);
    require('./v1/locations.api.router').attachTo(app, data);
    require('./v1/species.api.router').attachTo(app, data);
    require('./v1/vehicles.api.router').attachTo(app, data);
};

module.exports = {
    attachTo,
};
