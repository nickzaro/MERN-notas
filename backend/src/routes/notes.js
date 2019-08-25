const { Router } = require('express');
const router = Router();
const notesController = require('../controllers/notes.controller');

router.route('/')
    .get((req, res) => (notesController.getNotes(req,res)))
    .post((req, res) =>notesController.postNotes(req,res));

    router.route('/:id')
    .get((req, res) =>notesController.getNote(req,res))
    .put((req, res) =>notesController.putNote(req,res))
    .delete((req, res) =>notesController.deleteNote(req,res));
module.exports = router;