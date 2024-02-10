const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const axiosDogs = require('./axiosDogs');
const dogInfo = require('./dogInfoRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/axiosDogs', axiosDogs);
router.use('/dogInfo', dogInfo);

module.exports = router;
