const router = require('express').Router();
require('dotenv').config();
const cors = require('cors');

router.use(cors());

router.get('/:breed', (req, res) => {
  const reqData = req.params.breed;

  if (!reqData) {
    return res
      .status(400)
      .json({ ERROR: 'Please provide a dog breed for your query' });
  }

  if (reqData === 'Mix' || reqData === 'mix') {
    mixData = {
      weight: 'Varies', // Weight of a 'Mix' breed is 'Varies'
      height: 'Varies', // Height of a 'Mix' breed is 'Varies
      breed: 'Mix', // Breed of a 'Mix' breed is 'Mix'
      life_span: '10-15 years', // Average lifespan of a dog
      temperament: 'Varies', // Temperament of a 'Mix' breed is 'Varies
      image:
        'https://images.unsplash.com/photo-1558322394-4d8813ceef8a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Image of a 'Mix' breed
    };

    return res.json(mixData);
  }

  // Check if the request data contains a space
  const hasSpace = reqData.includes(' ');

  // Initialize the breed variable
  let breed = reqData;

  // If the request data contains a space, replace it with %20
  if (hasSpace) {
    breed = reqData.split(' ').join('%20');
  }

  const url = `https://api.thedogapi.com/v1/breeds/search?q=${breed}`;

  // Fetch the data
  fetch(url, {
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.API_KEY,
      'Allow-Access-Control-Origin': '*',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Check if the data is empty
      if (!data.length) {
        return res.status(404).json({ ERROR: 'No results found' });
      }

      const dog = data[0];
      // Create a new object
      const dogData = {
        weight: dog.weight.imperial,
        height: dog.height.imperial,
        breed: dog.name,
        life_span: dog.life_span,
        temperament: dog.temperament,
        image: dog.image.url,
      };
      // Send the new object as a json response
      res.json(dogData);
    })
    .catch((error) => {
      // Handle any errors here
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

module.exports = router;
