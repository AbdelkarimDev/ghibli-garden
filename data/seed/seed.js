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

const getFilmsIn = (json) => {
    const promises = [];
    json.films.forEach((p) => {
        promises.push(getJson(p));
    });

    return Promise.all(promises);
};

const getPeopleIn = (json) => {
    const promises = [];
    json.people.forEach((p) => {
        promises.push(getJson(p));
    });

    return Promise.all(promises);
};

const getSpeciesIn = (json) => {
    if (typeof json.species === 'string') {
        return getJson(json.species);
    }
    const promises = [];
    json.species.forEach((p) => {
        promises.push(getJson(p));
    });

    return Promise.all(promises);
};

const getLocationsIn = (json) => {
    const promises = [];
    json.locations.forEach((p) => {
        promises.push(getJson(p));
    });

    return Promise.all(promises);
};

const getVehiclesIn = (json) => {
    const promises = [];
    json.vehicles.forEach((p) => {
        promises.push(getJson(p));
    });

    return Promise.all(promises);
};

const trimPeopleJSON = (json) => {
    if (json.id) {
        delete json.id;
    }
    if (json.films) {
        delete json.films;
    }
    if (json.species) {
        delete json.species;
    }
    if (json.url) {
        delete json.url;
    }
    return json;
};

const trimSpeciesJSON = (json) => {
    if (json.id) {
        delete json.id;
    }
    if (json.films) {
        delete json.films;
    }
    if (json.people) {
        delete json.people;
    }
    if (json.url) {
        delete json.url;
    }
    return json;
};

const trimLocationsJSON = (json) => {
    if (json.id) {
        delete json.id;
    }
    if (json.films) {
        delete json.films;
    }
    if (json.residents) {
        delete json.residents;
    }
    if (json.url) {
        delete json.url;
    }
    return json;
};

const trimVehiclesJSON = (json) => {
    if (json.id) {
        delete json.id;
    }
    if (json.films) {
        delete json.films;
    }
    if (json.pilot) {
        delete json.pilot;
    }
    if (json.url) {
        delete json.url;
    }
    return json;
};

const trimFilmsJSON = (json) => {
    if (json.url) {
        delete json.url;
    }
    if (json.id) {
        delete json.id;
    }
    if (json.rt_score) {
        delete json.rt_score;
    }
    if (json.people) {
        delete json.people;
    }
    if (json.species) {
        delete json.species;
    }
    if (json.locations) {
        delete json.locations;
    }
    if (json.vehicles) {
        delete json.vehicles;
    }
    return json;
};

const trimMainFilmJSON = (json) => {
    if (json.rt_score) {
        delete json.rt_score;
    }
    if (json.id) {
        delete json.id;
    }
    if (json.url) {
        delete json.url;
    }
    return json;
};

const trimMainPeopleJSON = (json) => {
    if (json.id) {
        delete json.id;
    }
    if (json.url) {
        delete json.url;
    }
    return json;
};

const populateFilms = (films, currentIndex) => {
    if (currentIndex > films.length - 1) {
        films = films.map(trimMainFilmJSON);
        // Mongo Collection "Films" --->
        fs.writeFileSync('../test-json-result.json', JSON.stringify(films));
        return;
    }

    const currentFilm = films[currentIndex];
    getPeopleIn(currentFilm)
        .then((people) => {
            let newPeople;
            if (Array.isArray(people[0])) {
                newPeople = people[0].map(trimPeopleJSON);
            } else {
                newPeople = people.map(trimPeopleJSON);
            }
            currentFilm.people = newPeople;
            return getLocationsIn(currentFilm);
        })
        .then((locations) => {
            if (Array.isArray(locations[0])) {
                locations = locations[0].map(trimLocationsJSON);
                if (locations.length > 5) {
                    locations = locations.slice(0, 6);
                }
            }
            currentFilm.locations = locations;
            return getSpeciesIn(currentFilm);
        })
        .then((species) => {
            species = species.map(trimSpeciesJSON);
            currentFilm.species = species;
            return getVehiclesIn(currentFilm);
        })
        .then((vehicles) => {
            if (Array.isArray(vehicles[0])) {
                vehicles = vehicles[0].map(trimVehiclesJSON);
            }
            currentFilm.vehicles = vehicles;
            populateFilms(films, ++currentIndex);
        });
};

const getPeople = (url) => {
    return getJson(url);
};

const populatePeople = (people, currentIndex) => {
    if (currentIndex > people.length - 1) {
        people = people.map(trimMainPeopleJSON);
        // Mongo Collection "People" --->
        fs.writeFileSync('../test-json-result.json', JSON.stringify(people));
        return;
    }

    const currentPerson = people[currentIndex];
    getFilmsIn(currentPerson)
        .then((films) => {
            if (Array.isArray(films[0])) {
                films = films[0].map(trimFilmsJSON);
            } else {
                films = films.map(trimFilmsJSON);
            }
            currentPerson.films = films;
            return getSpeciesIn(currentPerson);
        })
        .then((species) => {
            if (Array.isArray(species[0])) {
                species = species[0].map(trimSpeciesJSON);
                if (species.length > 5) {
                    species = species.slice(0, 6);
                }
            } else {
                species = trimSpeciesJSON(species);
            }
            currentPerson.species = species;
            populatePeople(people, ++currentIndex);
        });
};

const seed = () => {
    // uncomment each, wait 20-30 sec, get seed data

    // getFilms(baseURL + 'films')
    //  .then((res) => {
    //    populateFilms(res, 0);
    //  });
    // getPeople(baseURL + 'people')
    //     .then((res) => {
    //         populatePeople(res, 0);
    //     });

};

module.exports = seed;
