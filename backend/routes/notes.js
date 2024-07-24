const express = require('express');
const fetchuser = require('../middleware/fetchuser');
// const User = require('../models/User');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const { findById } = require('../models/User');
const router = express.Router();


// Route 1: ------ get all notes: GET "/api/notes/fetchallnotes" . login needed
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured!!");
    }

});

// Route 2: ------ Add a new note: POST "/api/notes/addnote" . login needed
router.post('/addnote', fetchuser, [
    body('title', 'Enter your title').isLength({ min: 2 }),
    // body('description','Enter the description').isLength({min:2}),
    body('description').default(`This note was created on ${Date.now()}`),

], async (req, res) => {
    try {

        const { title, description, tag } = req.body;

        // --- If there are errors, return bad request and errors ---
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({ title, description, tag, user: req.user.id });
        const saveNote = await note.save();

        res.json(saveNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured!!");
    }
});


// Route 3: ------ Update existing note: PUT "/api/notes//updatenote/:id" . login needed
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
    const {title, description, tag} = req.body;
    // Creating new note Object 
    const NewNote = {}
    if(title){NewNote.title = title;}
    if(description){NewNote.description = description;}
    if(tag){NewNote.tag = tag;}

    // Find the targeted note and update it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not found");}

    // Check if the current user owns the note
    if(note.user.toString()!== req.user.id){return res.status(401).send("Not Allowed");}

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: NewNote}, {new: true});
    res.json({note});
} catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured!!");
}
});

// Route 4: ------ DELETE existing note: DELETE "/api/notes//deletenote/:id" . login needed
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
    // Find the targeted note and delete it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not found");}

    // Check if the current user owns the note
    if(note.user.toString()!== req.user.id){return res.status(401).send("Not Allowed");}

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted!", note:note});
} catch (error) {
        console.log(error.message);
        res.status(500).send("Internal SErver Error!");
}
});

module.exports = router;