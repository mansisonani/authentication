var express = require('express');
var router = express.Router();
const userController = require('../controllers/user')


router.post('/signup', userController.SignUp);

router.post('/login', userController.Login);

router.get('/users', userController.secure, userController.allUsers);

router.get('/getuser', userController.secure, userController.user);

module.exports = router;
