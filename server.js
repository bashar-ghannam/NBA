const axios = require('axios');
const express = require('express');
const app = express();
const path = require('path');

let players = [];
const teamToIDs = {
  lakers: '1610612747',
  warriors: '1610612744',
  heat: '1610612748',
  suns: '1610612756',
};
axios
  .get('http://data.nba.net/10s/prod/v1/2018/players.json')
  .then(function (response) {
    players = response.data.league.standard
      .filter((player) => player.isActive === true)
      .filter((player) => Object.values(teamToIDs).includes(player.teamId));
  })
  .catch(function (error) {
    console.log(error);
  });

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.get('/teams/:teamName', function (request, response) {
  const name = request.params.teamName;
  response.send(
    players
      .filter((player) => player.teamId == teamToIDs[name])
      .map((player) => {
        return {
          firstName: player.firstName,
          lastName: player.lastName,
          jersey: player.jersey,
          pos: player.pos,
        };
      })
  );
});

const port = 3000;
app.listen(port, function () {
  console.log(`Running server on port ${port}`);
});
