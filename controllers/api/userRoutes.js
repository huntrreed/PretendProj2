const router = require('express').Router();
const { User } = require('../../models');

router.post('/get-started-form', async (req, res) => {
  const {
    name,
    userName,
    email,
    password,
    fostering,
    hasPets,
    fencedYard,
    hasKids,
    previousExp,
    anythingElse,
    why,
  } = req.body;

  try {
    const newUser = await User.create({
      name,
      userName,
      email,
      password,
      fostering,
      hasPets,
      fencedYard,
      hasKids,
      previousExp,
      anythingElse,
      why,
    });

    res.send('Success!');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err.errors);
    console.error(err.message);
    console.error(err.stack);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
