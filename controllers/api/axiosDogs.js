const router = require('express').Router();
const axios = require('axios'); // for making HTTP requests
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

router.get('/dogs', async (req, res) => {
  try {
    const response = await axios.get('https://thedogapi.com./breeds');
    const dogData = response.data;

    res.status(200).json(dogData);
  } catch (error) {
    console.error('Error fetching dog data:', error);
    res.status(500).send('Error fetching dog data');
  }
});

module.exports = router;
