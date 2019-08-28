export default class SwapiService {

    _apiBase = 'https://swapi.co/api';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url} , received ${res.status}`);
        }
        return await res.json();
    }


    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    async getPerson(id) {
        const people = await this.getResource(`/people/${id}/`);
        return this._transofrmPlanet(people);
    }

    async getAllPersons() {
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPerson);
    }

    async getAllPlanets() {
        const res = await this.getResource(`/planets/`);
        return res.results.map(this._transofrmPlanet);
    }


    async getPlanet(id) {
        const planet = await this.getResource(`/planets/${id}/`);
        return this._transofrmPlanet(planet);
    }

    async getStarship(id) {
        const starship = await this.getResource(`/starships/${id}/`);
        return this._transofrmPlanet(starship);
    }

    async getAllStarships() {
        const res = await this.getResource(`/starships/`);
        return res.results.map(this._transformStarship);
    }

    _transofrmPlanet(planet) {
        return {
            id:this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        };
    }

    _transformStarship(starship) {
        return {
            id:this._extractId(starship),
            name: starship.name,
            model:starship.model,
            manufacturer: starship.manufacturer,
            length: starship.length
        };
    }


    _transformPerson(person) {
        return {
            id:this._extractId(person),
            name: person.name,
            gender:person.gender,
            eyeColor: person.eyeColor
        };
    }

}

