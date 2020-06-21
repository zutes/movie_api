const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  morgan = require("morgan"),
  app = express();

  let Movie = mongoose.model('Movie', movieSchema);
  let User = mongoose.model('User', userSchema);

//My top 10 movies
let movies = [
  {
    id: 1,
    title: "Ghostbusters",
    description:
      "Three former parapsychology professors set up shop as a unique ghost removal service.",
    genre: "Comedy",
    director: "Ivan Reitman",
    image: "img/ghostbusters.png",
    //featured: 'Yes'
  },
  {
    id: 2,
    title: "Indiana Jones and the Raiders of the Lost Ark",
    description:
      "In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolf Hitler's Nazis can obtain its awesome powers.",
    genre: "Adventure",
    director: "Steven Spielberg",
    image: "img/indiana_jones.png",
    //featured: 'No'
  },
  {
    id: 3,
    title: "Happy Gilmore",
    description:
      "A rejected hockey player puts his skills to the golf course to save his grandmother's house.",
    genre: "Comedy",
    director: "Dennis Dugan",
    image: "img/happy_gilmore.png",
    //featured: 'No'
  },
  {
    id: 4,
    title: "Dazed and Confused",
    description:
      "The adventures of high school and junior high students on the last day of school in May 1976.",
    genre: "Comedy",
    director: "Richard Linklater",
    image: "img/dazed_confused.png",
    //featured: 'Yes'
  },
  {
    id: 5,
    title: "Glory",
    description:
      "Robert Gould Shaw leads the U.S. Civil War's first all-black volunteer company, fighting prejudices from both his own Union Army, and the Confederates.",
    genre: "Biography",
    director: "Edward Zwick",
    image: "img/glory.png",
    //featured: 'Yes'
  },
  {
    id: 6,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    genre: "Fantasy",
    director: "Peter Jackson",
    image: "img/lord_rings.png",
    //featured: 'Yes'
  },
  {
    id: 7,
    title: "Scrooge",
    description:
      "A musical retelling of Charles Dickens' classic novel about an old bitter miser taken on a journey of self-redemption, courtesy of several mysterious Christmas apparitions. ",
    genre: "Drama",
    director: "Ronald Neame",
    image: "img/scrooge.png",
    //featured: 'Yes'
  },
  {
    id: 8,
    title: "Event Horizon",
    description:
      "A rescue crew investigates a spaceship that disappeared into a black hole and has now returned...with someone or something new on-board.",
    genre: "Sci-Fi",
    director: "Paul W.S. Anderson",
    image: "img/event_horizon.png",
    //featured: 'Yes'
  },
  {
    id: 9,
    title: "Friday",
    description:
      "Two homies, Smokey and Craig Jones, smoke a dope dealer's weed and try to figure a way to get the two hundred dollars they owe to the dealer by 10 p.m. that same night.",
    genre: "Comedy",
    director: "F. Gary Gray",
    image: "img/friday.png",
    //featured: 'Yes'
  },
  {
    id: 10,
    title: "The Simpsons Movie",
    description:
      "After Homer deliberately pollutes the town's water supply, Springfield is encased in a gigantic dome by the EPA and the family are declared fugitives.",
    genre: "Animation",
    director: "David Silverman",
    image: "img/the_simpsons.png",
    //featured: 'Yes'
  },

  {
    id: 11,
    title: "Saving Private Ryan",
    description: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    genre: "Drama",
    director: "Steven Spielberg",
    image: "img/saving_ryan.png",
    //featured: 'Yes'
  },

  {
    id: 12,
    title: "Waking Life",
    description: "A man shuffles through a dream meeting various people and discussing the meanings and purposes of the universe.",
    genre: "Drama",
    director: "Richard Linklater",
    image: "img/waking_life.png",
    //featured: 'Yes'
  }
];

//Genres
let genres = [
  {
    name: "Action",
    description:
      "Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, and frantic chases. Action films tend to feature a resourceful hero struggling against incredible odds, which include life-threatening situations, a villain, or a pursuit which usually concludes in victory for the hero.",
  },
  {
    name: "Adventure",
    description:
      "Adventure films are a genre of film that typically use their action scenes to display and explore exotic locations in an energetic way.",
  },
  {
    name: "Animation",
    description:
      "Animation is a method in which figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film. Today, most animations are made with computer-generated imagery (CGI). Computer animation can be very detailed 3D animation, while 2D computer animation can be used for stylistic reasons, low bandwidth or faster real-time renderings. Other common animation methods apply a stop motion technique to two and three-dimensional objects like paper cutouts, puppets or clay figures. ",
  },
  {
    name: "Biography",
    description:
      "A biographical film, or biopic, is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character's real name is used.[2] They differ from docudrama films and historical drama films in that they attempt to comprehensively tell a single person's life story or at least the most historically important years of their lives.",
  },

  {
    name: "Comedy",
    description:
      "A comedy film is a genre of film in which the main emphasis is on humour. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.",
  },

  {
    name: "Drama",
    description:
      "In film and television, drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. All forms of cinema or television that involve fictional stories are forms of drama in the broader sense if their storytelling is achieved by means of actors who represent (mimesis) characters.",
  },
  {
    name: "Fantasy",
    description:
      "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds. The genre is considered a form of speculative fiction alongside science fiction films and horror films, although the genres do overlap. Fantasy films often have an element of magic, myth, wonder, escapism, and the extraordinary.",
  },

  {
    name: "Horror",
    description:
      "A horror film is a film that seeks to elicit fear for entertainment purposes.[1] Initially inspired by literature from authors such as Edgar Allan Poe, Bram Stoker, and Mary Shelley,[2] horror has existed as a film genre for more than a century. The macabre and the supernatural are frequent themes. Horror may also overlap with the fantasy, supernatural fiction, and thriller genres.",
  },
  {
    name: "Sci-Fi",
    description:
      "Science fiction film (or sci-fi film) is a genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, alien worlds, extrasensory perception and time travel, along with futuristic elements such as spacecraft, robots, cyborgs, interstellar travel or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition. In many cases, tropes derived from written science fiction may be used by filmmakers ignorant of or at best indifferent to the standards of scientific plausibility and plot logic to which written science fiction is traditionally held.",
  },

  {
    name: "Sport",
    description:
      "A sports film is a film genre that uses sport as the theme of the film. It is a production in which a sport, sporting event, athlete (and their sport), or follower of sport (and the sport they follow) are prominently featured, and which depend on sport to a significant degree for their plot motivation or resolution. Despite this, sport is ultimately rarely the central concern of such films and sport performs primarily an allegorical role.[1] Furthermore, sports fans are not necessarily the target demographic in such movies, but sports fans tend to have a large following or respect for such movies.",
  },

  {
    name: "Thriller",
    description:
      "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that evokes excitement and suspense in the audience. Tension is created by delaying what the audience sees as inevitable, and is built through situations that are menacing or where escape seems impossible.",
  },
];

//Directors
let directors = [
  {
    name: "Steven Spielberg",
    born: " December 18, 1946",
  },
];

//Users

let users = [
  {
    
    username: "jd1",
    password: "123",
    email: "jd1@jd.com",
    dateofbirth: "01012000",
    
  },
];

let favorites = [{id: 1,
  title: "Ghostbusters",
  description:
    "Three former parapsychology professors set up shop as a unique ghost removal service. ",
  genre: "Action, Comdey, Fantasy",
  director: "Ivan Reitman",
  image: "img/ghostbusters.png"}];

//Logging with morgan's common format
app.use(morgan("common"));

//Use bodyParser
app.use(bodyParser.json());

//Gets a list of all movies
app.get("/movies", (req, res) => {
  res.json(movies);
});

//Gets info on a single movie title
app.get("/movies/:title", (req, res) => {
  res.json(
    movies.find((movie) => {
      return movie.title === req.params.title;
    })
  );
});

//Gets info on a movie genre by name
app.get("/genre/:name", (req, res) => {
  res.json(
    genres.find((genre) => {
      return genre.name === req.params.name;
    })
  );
});

//Gets info on a director by name
app.get("/directors/:name", (req, res) => {
  res.json(
    directors.find((director) => {
      return director.name === req.params.name;
    })
  );
});

///Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//Updates a user's info
app.put("/users/:username/:password/:email/:dateofbirth", (req, res) => {
  res.send("User information updated.");
});

//Add a movie to the user's favorites
app.post("/favorites/:username/:title", (req, res) => {
  let newFavorite = req.body;

  if (!newFavorite.title) {
    const message = "Missing movie title in request body";
    res.status(400).send(message);
  } else {
    newFavorite.id = uuid.v4();
    favorites.push(newFavorite);
    res.status(201).send(newFavorite);
  }
});

//Delete a movie from the user's favories
app.delete("/favorites/:username/:title", (req, res) => {
  let favorite = favorites.find((favorite) => {
    return favorite.title === req.params.title;
  });
  if (favorite) {
    favorites.filter(function (obj) {
      return obj.title !== req.params.title;
    });
    res
      .status(201)
      .send(req.params.title + " was removed from your favorites.");
  }
});

//Delete a user from the app
app.delete("/users/:username", (req, res) => {
  let user = users.find((user) => {
    return user.username === req.params.username;
  });
  if (user) {
    users.filter(function (obj) {
      return obj.username !== req.params.username;
    });
    res
      .status(201)
      .send(req.params.username + " has been removed from the app.");
  }
});

app.use(express.static("public"));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your MyFlix app is listening on port 8080");
});