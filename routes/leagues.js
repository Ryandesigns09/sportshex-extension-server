const express = require('express');
const Team = require('../models/Team');
const router = express.Router();

router.get('/:league', async (req, res) => {
  try {
    const teams = await Team.find({ league: req.params.league }).sort({ name: 1 });
    if (teams.length == 0) {
      return res.status(404).json({ message: 'Cannot find any teams in this league' });
    }
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
