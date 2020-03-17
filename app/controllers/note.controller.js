const Note = require('../models/note.model.js');

//Create and save new note
exports.create = (req,res) => {
    //Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message:"Please provide content."
        });
    }

    //create note
    const note = new Note({
        tile: req.body.title || "Untitle Note",
        content: req.body.content
    });

    //Save note in db
    note.save()
    .then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occured creating note"
        });
    });

};

//Retrive and return all notes from db
exports.findAll = (req,res) => {
    Note.find()
    .then(notes=>{
        res.send(notes);
    }).catch(err=>{
        res.status(400).send({
            message:err || "Some error occured whilre retraving record"
        })
    })
}

//Find the single note with noteId
exports.findOne = (req,res) => {
    Note.findById(req.param.noteId)
    .then(note => {
        if(!note){
            return res.send(404).send({
                message:"Note not found with id" + req.params.noreId
            })
        }
        res.send(note);
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    })

}

//Update the note with noteId
exports.update = (req,res) => {

    //Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message:"Please provide content."
        });
    }

    //Find note and update with id
    Note.findByOneAndUpdate(req.params.noteId,{
        title:req.body.title || 'Untitled Note',
        content: req.body.content
    },{new:true})
    .then(note=>{
        if(!note)
        {
            return res.status(404).send({
                message:'Note not found with noteId'+req.param.noteId
            });
        }
        res.send(note);
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    })

};

//Delete a note with noteId
exports.delete = (req,res) => {
    Note.findByOneAndDelete(req.params.noteId)
    .then(note=>{
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    })
    .catch(err=>{
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    })
}