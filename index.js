const express = require('express');
morgan = require('morgan');
const app = express();

//Update this data with my top 10 movies
let movies = [
    {
    id: 1,
    title: 'Fight Club',
    description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
    genre: 'Drama',
    director: 'David Fincher',
    image: 'img/fight_club.png',
    featured: 'Yes'
    },
    {
    id: 2,
    title: 'Rubber',
    description: 'A homicidal car tire, discovering it has destructive psionic power, sets its sights on a desert town once a mysterious woman becomes its obsession.',
    genre: 'Comedy, Fantasy, Horror',
    director: 'Quentin Dupieux',
    image: 'img/rubber.png',
    featured: 'No'
    },
    {
    id: 3,
    title: 'The Sunset Limited',
    description: 'Through a chance encounter, two men of opposing ideologies deliberate spiritual, philosophical, and profound matters in a New York City apartment.',
    genre: 'Drama',
    director: 'Tommy Lee Jones',
    image: 'img/sunset_limited.png',
    featured: 'No'
    },
    {
    id: 4,
    title: 'John Wick',
    description: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.',
    genre: 'Action, Crime, Thriller',
    director: 'Chad Stahelski',
    image: 'img/john_wick.png',
    featured: 'Yes'
    },
    {
    id: 5,
    title: 'Ex Machina',
    description: 'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.',
    genre: 'Drama, Mystery, Sci-Fi, Thriller',
    director: 'Alex Garland',
    image: 'img/ex_machina.png',
    featured: 'Yes'
    },
    ];

//logging with morgan's common format
app.use(morgan('common'));

//get requests
app.get('/movies', function(req, res) {
    res.json(movies)
});

app.get('/', function(req, res) {
    res.send('Hi, welcome to my MyFlix')
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// listen for requests
app.listen(8080);