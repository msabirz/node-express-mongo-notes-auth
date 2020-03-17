module.exports = app => {
    const notes = require('../controllers/note.controller');
    var auth = require('../auth/auth');

    //Create a new Note
    app.post ('/notes',auth,notes.create);

    //Retrive all Note
    app.get('/notes',notes.findAll);

    //Retrive a single note with noteId
    app.get('/note/:noteId',notes.findOne);

    //Update a Note with noteId
    app.put('/notes/:noteId',notes.update);

    //Delete a Note with noteId
    app.delete('/notes/:noteId',notes.delete);

}