const mongoose = require('mongoose');
const fs = require('fs');
const Team = require('./models/Team');

mongoose.connect('mongodb+srv://sportshexdb:DhHohAMPrlvV347R@teamcolors.sm9vwpt.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

fs.readFile('./teams.json', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const leagues = JSON.parse(data);
  leagues.forEach(league => {
    league.teams.forEach(team => {
      const teamModel = new Team({
        name: team.name,
        league: league.league,
        colors: team.colors.map(color => ({
          name: '', // Update this if you have color names.
          hex: color
        }))
      });

      teamModel.save()
        .then(() => console.log(`Saved ${team.name}`))
        .catch(error => console.error(error));
    });
  });
});
