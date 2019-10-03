var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var songs = [
  {
    id: 1,
    track: 'You Little Beauty'
  },
  {
    id: 2,
    track: 'Generate'
  }
];

var currentID = 2;

var PORT = process.env.PORT || 3000;


// ALLOWING US TO USE EXPRESS & BODY PARSER //
app.use(express.static(__dirname));
app.use(bodyParser.json())

// GET REQUEST TO GRAB ALL SONGS FROM THE LIST //
app.get('/api/songs', (req, res) => {
  res.send({songs: songs});
})


// POST REQUEST TO ADD A SONG TO THE PLAYLIST ARRAY //
app.post('/api/songs/', (req, res) => {
  var songName = req.body.name;
  currentID++;

  songs.push({
    id: currentID,
    name: songName
  });

  res.send("Successfully added a track to playlist!");
})

app.listen(PORT, function(){
  console.log('Server Listening on ' + PORT);
});