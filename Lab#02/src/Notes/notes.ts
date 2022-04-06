import express from 'express';
import {Request, Response} from 'express';
import {readFile, writeFile, writeFileSync} from 'fs';

import {Note, Tag, User} from '../classes';

const router = express.Router();

const rootPath = './';
const notesPath = rootPath + './storage/notes/notes.json';
const tagsPath = rootPath + './storage/tags/tags.json';

var notesList: Note[] = [] ;
readFile(notesPath, (err, data) => {
    if (err) throw err;
    notesList = JSON.parse(data.toString());
});

var tagsList: Tag[] = [];
readFile(tagsPath, (err, data) => {
    if (err) throw err;
    tagsList = JSON.parse(data.toString());
});

//get all notes
router.get('/list',  (req: Request, res: Response) => {
    try{
        res.status(200).send(notesList)
    }catch(e){
        res.status(500).send(e)
    }
})
//create a new note
router.post('/', (req: Request, res: Response) => {
    try{
        const note = new Note(req.body.note)
        let tags: Tag = new Tag(req.body.tags)
        if(note.tags !== [] && note.tags !== undefined){
            note.tags.filter(tag => tags?.name === tag?.name)
        }
        notesList.push(note)
        res.send(note)
	    console.log(notesList)
    }catch{
        res.send('error')
    }
})
//create new notes in bulk
router.post('/bulk', (req: Request, res: Response) => {
    try{
        const reqNotes: Note[]  = req.body.notes;
            reqNotes.forEach(note => {
                if(note.tags !== undefined){
                    note.tags?.forEach(tag => {
                        if(!tagsList.find(t => t.name === tag.name)){
                            tagsList.push(tag)
                            writeFileSync(tagsPath, JSON.stringify(tagsList))
                        }
                    })
                }
            })
        reqNotes.map(note => {
            notesList.concat(new Note(note))
            writeFileSync(notesPath, JSON.stringify(notesList));
            res.status(200).send(notesList)
        })
    }
    catch(e){
        res.status(500).send(e)
    }
})
//get a note by id
router.get('/:id', (req: Request, res: Response) => {
    try{
        const note = notesList.find(note => note.id === req.params.id)
        if(note){
            res.status(200).send(note)
        }else{
            res.status(404).send('note not found')
        }
    }
    catch{
        res.send('Cannot get note of id: ' + req.params.id)
    }
})
//update a note
router.put('/:id', (req: Request, res: Response) => {
    try{
        let foundNote = notesList.find(note => note.id === req.params.id)
        if(foundNote){
            foundNote = new Note({...foundNote, ...req.body.note})
            notesList = notesList.filter(note => note.id === req.params.id).concat(foundNote)
            writeFileSync(notesPath, JSON.stringify(notesList))            
            res.status(200).send(foundNote)
        }else{
            res.status(404).send('note not found')
        }
    }
    catch{
        res.send('Cannot update note of id: ' + req.params.id)
    }
})
//delete a note
router.delete('/:id', (req: Request, res: Response) => {
    try{
        notesList = notesList.filter(note => note.id !== req.params.id)
        res.send(notesList)
	    console.log(notesList)
    }
    catch{
        res.send('Cannot delete note of id: ' + req.params.id)
    }
})

module.exports = router;
