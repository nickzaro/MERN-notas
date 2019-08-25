const { Router } = require('express');
const router = Router();
const usersController = require('../controllers/users.controllers')

router.route('/')
    .get((req, res) => usersController.getUsers(req,res))
    .post((req, res) =>usersController.postUser(req,res));
router.route('/:id')
    .delete((req, res) => usersController.deleteUser(req,res));   
module.exports = router;