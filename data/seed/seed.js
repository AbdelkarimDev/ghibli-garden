const fetch = require('node-fetch');
const fs = require('fs');

const baseURL = 'https://ghibliapi.herokuapp.com/';

const getJson = (url) => {
    return fetch(url)
        .then((res) => {
            return res.json();
        });
};

const getFilms = (url) => {
    return getJson(url);
};

const getPeopleInFilm = (film) => {
    const promises = [];
    film.people.forEach((p) => {
        promises.push(getJson(p));
    });

    return Promise.all(promises);
};

const getSpeciesInFilm = (film) => {
    const promises = [];
    film.species.forEach((p) => {
        promises.push(getJson(p));
    });

    return Promise.all(promises);
};

const getLocationsInFilm = (film) => {
    const promises = [];
    film.locations.forEach((p) => {
        promises.push(getJson(p));
    });

    return Promise.all(promises);
};

const getVehiclesInFilm = (film) => {
    const promises = [];
    film.vehicles.forEach((p) => {
        promises.push(getJson(p));
    });

    return Promise.all(promises);
};

const populateFilms = (films, currentIndex) => {
    if (currentIndex > films.length - 1) {
        fs.writeFileSync('../test-json-result.json', JSON.stringify(films));
        return;
    }

    const currentFilm = films[currentIndex];
    getPeopleInFilm(currentFilm)
        .then((people) => {
            currentFilm.people = people;
            return getLocationsInFilm(currentFilm);
        })
        .then((locations) => {
            currentFilm.locations = locations;
            return getSpeciesInFilm(currentFilm);
        })
        .then((species) => {
            currentFilm.species = species;
            return getVehiclesInFilm(currentFilm);
        })
        .then((vehicles) => {
            currentFilm.vehicles = vehicles;
            populateFilms(films, ++currentIndex);
        })
        .catch((error) => {
            console.log(error.message());
        });
};

const seed = () => {
    getFilms(baseURL + 'films')
        .then((res) => {
            populateFilms(res, 0);
        });
};

module.exports = seed;
