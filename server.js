var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var songs = [
  {
    id: 1,
    track: 'You Little Beauty',
    artist: 'Fisher',
    genre: 'House'
  },
  {
    id: 2,
    track: 'Generate',
    artist: 'Eric Prydz',
    genre: 'Progressive House'
  },
  {
    id: 3,
    track: 'Deceiver',
    artist: 'Chris Lake',
    genre: 'Tech House'
  }
];

var currentID = 3;

var PORT = process.env.PORT || 3000;


// ALLOWING US TO USE EXPRESS & BODY PARSER //
app.use(express.static(__dirname));
app.use(bodyParser.json())

// C. R. U. D. BEGINS //

// GET REQUEST TO GRAB ALL SONGS FROM THE LIST //
app.get('/api/songs', (req, res) => {
  res.send({songs: songs});
})


// POST REQUEST TO ADD A SONG TO THE PLAYLIST ARRAY //
app.post('/api/songs/', (req, res) => {
  var songName = req.body.track;
  var artistName = req.body.artist;
  var genreName = req.body.genre;
  currentID++;

  songs.push({
    id: currentID,
    track: songName,
    artist: artistName,
    genre: genreName
  });

  res.send("Successfully added a track to playlist!");
});


// UPDATING/PUT REQUEST TO EDIT A SONG FROM THE PLAYLIST ARRAY //
app.put('/api/songs/:id', (req, res) => {
  var id = req.params.id;
  var updatedSong = req.body.updatedSong;
  var found = false;

  songs.forEach((song, index) => {
    if (!found && song.id === Number(id)) {
      song.track = updatedSong;
    }
  });

  res.send('You have updated a song!');
})

// DELETE SONG FROM PLAYLIST ARRAY //
app.delete('/api/songs/:id', (req, res) => {
  var id = req.params.id;
  var found = false;

  songs.forEach((song, index) => {
    if (!found && song.id === Number(id)) {
      songs.splice(index, 1);
    }
  });

  res.send('You have just deleted a song')
});


app.listen(PORT, function(){
  console.log('Server Listening on port: ' + PORT);
});