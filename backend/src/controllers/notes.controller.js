const Note = require('../models/Note');

class NotesController {

    async getNotes(req, res) {

        const notes = await Note.find();
        res.json(notes);
    }
    async postNotes(req, res) {
        const { title, content, date, author } = req.body;
        const newNote = new Note({
            title: title,
            content: content,
            date: date,
            author: author
        });
        await newNote.save();
        res.json({ message: "Note saved" })
    }
    async getNote(req, res) {
        const note = await Note.findById(req.params.id);
        if (note != null)
            res.json(note);
        else
            res.json("Note not found");

    }
    async putNote(req, res) {
        const note = await Note.findOneAndUpdate(req.params.id, req.body);
        if (note != null) {
            res.json({ message: "Note Updated" });
        } else
            res.json({ message: "Note not found" });



    }
    async deleteNote(req, res) {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (note != null)
            res.json({ message: "note deleted" });
        else
            res.json({ message: "note not deleted" });

    }
}
const notesController = new NotesController();

module.exports = notesController;