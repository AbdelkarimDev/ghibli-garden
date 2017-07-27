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
    if (typeof json.films === 'string') {
        return getJson(json.films);
    }

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

const getPilotIn = (json) => {
    return getJson(json.pilot);
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
        json.url = '';
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
        json.url = '';
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
        json.url = '';
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
        json.url = '';
    }
    return json;
};

const trimFilmsJSON = (json) => {
    if (json.url) {
        json.url = '';
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

const trimPilotJSON = (json) => {
    if (json.url) {
        json.url = '';
    }
    if (json.id) {
        delete json.id;
    }
    if (json.films) {
        delete json.films;
    }
    if (json.species) {
        delete json.species;
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
        json.url = '';
    }
    return json;
};

const trimMainPeopleJSON = (json) => {
    if (json.id) {
        delete json.id;
    }
    if (json.url) {
        json.url = '';
    }
    return json;
};

const trimMainSpeciesJSON = (json) => {
    if (json.id) {
        delete json.id;
    }
    if (json.url) {
        json.url = '';
    }
    return json;
};

const trimMainVehiclesJSON = (json) => {
    if (json.id) {
        delete json.id;
    }
    if (json.url) {
        json.url = '';
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

// refactor - >
const getPeople = (url) => {
    return getJson(url);
};

const getLocations = (url) => {
    return getJson(url);
};


const getSpecies = (url) => {
    return getJson(url);
};

const getVehicles = (url) => {
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

const populateSpecies = (species, currentIndex) => {
    if (currentIndex > species.length - 1) {
        species = species.map(trimMainSpeciesJSON);
        // Mongo Collection "Species" --->
        // fs.writeFileSync('../test-json-result.json',
        // JSON.stringify(species));
        return;
    }

    const currentSpecies = species[currentIndex];
    getFilmsIn(currentSpecies)
        .then((films) => {
            if (Array.isArray(films[0])) {
                films = films[0].map(trimFilmsJSON);
            } else {
                films = films.map(trimFilmsJSON);
            }
            currentSpecies.films = films;
            return getPeopleIn(currentSpecies);
        })
        .then((people) => {
            let newPeople;
            if (Array.isArray(people[0])) {
                newPeople = people[0].map(trimPeopleJSON);
            } else {
                newPeople = people.map(trimPeopleJSON);
            }
            currentSpecies.people = newPeople;
            populateSpecies(species, ++currentIndex);
        });
};

const populateVehicles = (vehicles, currentIndex) => {
    if (currentIndex > vehicles.length - 1) {
        vehicles = vehicles.map(trimMainVehiclesJSON);
        // Mongo Collection "Vehicles" --->
        // fs.writeFileSync('../test-json-result.json',
        // JSON.stringify(vehicles));
        return;
    }

    const currentVehicle = vehicles[currentIndex];
    getFilmsIn(currentVehicle)
        .then((films) => {
            films = trimFilmsJSON(films);
            currentVehicle.films = films;
            return getPilotIn(currentVehicle);
        })
        .then((pilot) => {
            pilot = trimPilotJSON(pilot);
            currentVehicle.pilot = pilot;
            populateVehicles(vehicles, ++currentIndex);
        });
};

const generateFilmsSeed = () => {
    getFilms(baseURL + 'films')
     .then((res) => {
       populateFilms(res, 0);
     });
};

const generatePeopleSeed = () => {
    getPeople(baseURL + 'people')
        .then((res) => {
            populatePeople(res, 0);
        });
};

const generateLocationsSeed = () => {
    getLocations(baseURL + 'locations')
        .then((res) => {
            res = res.map(trimLocationsJSON);
            return res;
        })
        .then((res) => {
            // Mongo Collection "Locations" --->
            // fs.writeFileSync('../test-json-result.json',
            //     JSON.stringify(res));
        });
};

const generateSpeciesSeed = () => {
    getSpecies(baseURL + 'species')
        .then((res) => {
            populateSpecies(res, 0);
            // fs.writeFileSync('../test-json-result.json',
            //     JSON.stringify(res));
        });
};

const generateVehiclesSeed = () => {
    getVehicles(baseURL + 'vehicles')
        .then((res) => {
            populateVehicles(res, 0);
            // fs.writeFileSync('../test-json-result.json',
            // JSON.stringify(res));
        });
}

const seed = () => {
    // uncomment each, wait 20-30 sec, get seed data
    // generateFilmsSeed();
    // generateLocationsSeed();
    // generatePeopleSeed();
    // generateSpeciesSeed();
    // generateVehiclesSeed();

    

};

module.exports = seed;
