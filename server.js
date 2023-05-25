const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const teamsRouter = require('./routes/teams');
const leaguesRouter = require('./routes/leagues');

const mongoURI = 'mongodb+srv://sportshexdb:DhHohAMPrlvV347R@teamcolors.sm9vwpt.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {
  console.log('Connected to Database');
  console.log('MongoDB URI:', mongoURI);
});

const app = express();
app.use(cors());

app.use(express.json());
app.use('/teams', teamsRouter);
app.use('/league', leaguesRouter);

app.listen(3000, () => console.log('Server Started'));
