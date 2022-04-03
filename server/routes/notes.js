const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = require('../models/note');

router.get('/notes', async function (req, res) {
    let notes = await Note.find({});
    res.json(notes);
});

router.post('/notes', async function (req, res) {
    const newNote = new Note({
        id: req.body.id,
        text: req.body.text,
        lastUpdatedDate: req.body.lastUpdatedDate,
        tags: req.body.tags,
    })
    await newNote.save();
    res.json(newNote);
});

router.put('/notes/:id', async function (req, res) {
    const id = req.params.id;
    const {text, lastUpdatedDate, tags} = req.body;
    await Note.findByIdAndUpdate(id, {text, lastUpdatedDate, tags}, 
        {runValidators: true});
    res.sendStatus(204);
});

router.delete('/notes/:id', async function (req, res) {
    const id = req.params.id;
    const result = await Note.findByIdAndDelete(id);
    res.json(result);
})

module.exports = router;