const axios = require('axios').default;
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
const fetch = function () {
  axios
    .get('http://data.nba.net/10s/prod/v1/2018/players.json')
    .then(function (response) {
      players = response.data.league.standard
        .filter((element) => element.isActive === true)
        .filter((element) => Object.values(teamToIDs).includes(element.teamId));
    })
    .catch(function (error) {
      console.log(error);
    });
};
fetch();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.get('/teams/:teamName', function (request, response) {
  const name = request.params.teamName;
  response.send(
    players
      .filter((element) => element.teamId == teamToIDs[name])
      .map((element) => {
        return {
          firstName: element.firstName,
          lastName: element.lastName,
          jersey: element.jersey,
          pos: element.pos,
        };
      })
  );
});

const port = 3000;
app.listen(port, function () {
  console.log(`Running server on port ${port}`);
});
