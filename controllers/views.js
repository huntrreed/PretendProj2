const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  // Assuming req.user is set and contains the user's information
  res.render('profile', { user: req.user });
});

module.exports = router;
