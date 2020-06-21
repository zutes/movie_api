const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  mongoose = require("mongoose");
  Models = require("./models.js");
  app = express();
  Movies = Models.Movie;
  Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Logging with morgan's common format
app.use(morgan("common"));

//Use bodyParser
app.use(bodyParser.json());

app.use(express.static("public"));

//Gets a list of all movies
app.get("/movies", function(req, res) {

  Movies.find()
  .then(function(movies) {
    res.status(201).json(movies)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//Gets info on a single movie title
app.get("/movies/:Title", function(req, res) {
  
  Movies.findOne({ Title : req.params.Title })
    .then(function(movie) {
      res.json(movie)
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
  });

//Gets info on a movie genre by name
app.get("/movies/Genres/:Name", function(req, res) {
  Movies.findOne({'Genre.Name': req.params.Name})
  .then(function(movies){
    res.json(movies.Genre)
    })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error:" + err);
  });
});


//Gets info on a director by name
app.get("/movies/Directors/:Name", (req, res) => {
  Movies.findOne({
      'Director.Name' : req.params.Name 
  })
  .then(function(movies) {
    res.json(movies.Director)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
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
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', function(req, res) {
  Users.update({ Username : req.params.Username }, 
    { 
      $set : {
          Username : req.body.Username,
          Password : req.body.Password,
          Email : req.body.Email,
          Birthday : req.body.Birthday
      }
    },
    { new : true }, // This line makes sure that the updated document is returned
    function(err, updatedUser) {
      if(err) {
        console.error(err);
        res.status(500).send("Error: " +err);
      } else {
        res.json(updatedUser)
      }
    })                    
  });

//Add a movie to a user's list of favorites
app.post('/users/:Username/Movies/:MovieID', function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $push : { FavoriteMovies : req.params.MovieID }
  },
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});

//Delete a movie from the user's favories
app.delete('/users/:Username/Movies/:MovieID', function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
      $pull : { FavoriteMovies : req.params.MovieID }
    },
    { new : true }, // This line makes sure that the updated document is returned
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })
  });


// Delete a user by username
app.delete('/users/:Username', function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then(function(user) {
      if (!user) {
          res.status(400).send(req.params.Username + " was not found");
      } else {
          res.status(200).send(req.params.Username + " was deleted.");
      }
  })
  .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
  });
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



//app.use(function (err, req, res, next) {
//console.error(err.stack);
//res.status(500).send("Something broke!");
//});

// listen for requests
app.listen(8080, () => {
  console.log("Your MyFlix app is listening on port 8080");
});