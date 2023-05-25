const express = require('express');
const Team = require('../models/Team');
const router = express.Router();

router.get('/', async (req, res) => {
  const { name, league } = req.query;

  try {
    let teams;
    if (name) {
      teams = await Team.find({ name: new RegExp(name, 'i') });
    } else if (league) {
      teams = await Team.find({ league: new RegExp(league, 'i') });
    } else {
      teams = await Team.find({});
    }

    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/league/:league', async (req, res) => {
  try {
    const teams = await Team.find({ league: req.params.league }).sort({ name: 1 });
    if (teams.length === 0) {
      return res.status(404).json({ message: 'Cannot find any teams in this league' });
    }
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const team = await Team.findOne({ name: req.params.name });
    if (!team) {
      return res.status(404).json({ message: 'Cannot find team' });
    }
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
