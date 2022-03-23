import express from 'express';
import e, {Request, Response} from 'express';
// look this s up
// import express.router from 'express.router';
import {Note, Tag} from './classes';

const app = express()
app.use(express.json())

let notes: Note[] = []
let tags: Tag[] = []

//dummy data
notes.push(new Note({title:'Pick up dry cleaning', content:'This is an example note'}))
notes.push(new Note({title:'Coffee with Joshua', content: 'This is an example note'}))
notes.push(new Note({title:'Coffee with Sarah', content:'This is an example note'}))
notes.push(new Note({title:'The greatest achievement of humankind', content:'The earth is flat'}))


//get all notes
app.get('/notes',  (req: Request, res: Response) => {
    try{
        res.status(200).send(notes)
    }catch(e){
        res.status(500).send(e)
    }
})
//create a new note
app.post('/note', (req: Request, res: Response) => {
    try{
        const note = new Note(req.body.note)
        notes.push(note)
        res.send(note)
	    console.log(notes)
    }catch{
        res.send('error')
    }
})
//create new notes in bulk
app.post('/notes', (req: Request, res: Response) => {
    try{
        const reqNotes: Note[]  = req.body.notes;
        reqNotes.map(note => {
            notes.concat(new Note(note))
            res.status(200).send(notes)
        })
    }
    catch(e){
        res.status(500).send(e)
    }
})
//get a note by id
app.get('/note/:id', (req: Request, res: Response) => {
    try{
        const note = notes.find(note => note.id === Number(req.params.id))
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
app.put('/note/:id', (req: Request, res: Response) => {
    try{
        let foundNote = notes.find(note => note.id === Number(req.params.id))
        if(foundNote){
            foundNote = new Note({...foundNote, ...req.body.note})
            res.status(200).send(foundNote)
        }else{
            res.status(404).send('note not found')
        }
	console.log(notes)
    }
    catch{
        res.send('Cannot update note of id: ' + req.params.id)
    }
})
//delete a note
app.delete('/note/:id', (req: Request, res: Response) => {
    try{
        const index = notes.findIndex(note => note.id === Number(req.params.id))
        notes.splice(index, 1)
        res.send(notes)
	    console.log(notes)
    }
    catch{
        res.send('Cannot delete note of id: ' + req.params.id)
    }
})






////////////////////////////////////////////////////////////////////////////////////////////
//tags tags tags tags tags tagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstags
////////////////////////////////////////////////////////////////////////////////////////////

//get all tags
app.get('/tags', (req: Request, res: Response) => {
    try{
        res.status(200).send(tags)
    }
    catch(e){
        res.status(500).send(e)
    }
})
//create a new tag
app.post('/tag', (req: Request, res: Response) => {
    try{
        const tag = new Tag(req.body.tag)
        tags.push(tag)
        res.send(tag)
        console.log(tags)
    }
    catch{
        res.send('error')
    }
})

//find a tag by id
app.get('/tag/:id', (req: Request, res: Response) => {
    try{
        const tag = tags.find(tag => tag.id === Number(req.params.id))
        if(tag){
            res.status(200).send(tag)
        }else{
            res.status(404).send('tag not found')
        }
    }
    catch{
        res.send('Cannot get tag of id: ' + req.params.id)
    }
})

//delete a tag by id
app.delete('/tag/:id', (req: Request, res: Response) => {
    try{
        const index = tags.findIndex(tag => tag.id === Number(req.params.id))
        tags.splice(index, 1)
        res.send(tags)
        console.log(tags)
    }
    catch{
        res.send('Cannot delete tag of id: ' + req.params.id)
    }
})

//update a tag
app.put('/tag/:id', (req: Request, res: Response) => {
    try{
        let foundTag = tags.find(tag => tag.id === Number(req.params.id))
        if(foundTag){
            foundTag = new Tag({...foundTag, ...req.body.tag})
            res.status(200).send(foundTag)
        }else{
            res.status(404).send('tag not found')
        }
        console.log(tags)
    }
    catch{
        res.send('Cannot update tag of id: ' + req.params.id)
    }
})

app.post('/', (req: Request, res: Response) => {
  console.log(req.body) // e.x. req.body.title 
  res.status(200).send('Hello from notes app')
})

app.listen(3000)
