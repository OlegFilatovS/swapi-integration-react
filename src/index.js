import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import SwapiService from './service/swapi-service.js';


ReactDOM.render(<App/>, 
    document.getElementById('root'));




const swapi = new SwapiService();

swapi.getAllPeople().then((people) => {
    people.forEach(man => {
        console.log(man.name);
    });
});

swapi.getPerson(4).then((person) =>{
    console.log(person.name)
});


