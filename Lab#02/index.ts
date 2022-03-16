import express from 'express'
import e, {Request, Response} from 'express'

const app = express()

let notes: Note[] = []



class Note {
    title: string
    content: string
    createDate?: Date
    tags?: string[]
    id?: number

    constructor(note: Note) {
        this.title = note.title || 'new note'
        this.content = note.content
        this.createDate = note.createDate || new Date();
        this.tags = note.tags || []
        this.id = note.id || Date.now();
    }
}

app.use(express.json())

//dummy data
notes.push(new Note({title:'Pick up dry cleaning', content:'This is an example note'}))
notes.push(new Note({title:'Coffee with Joshua', content: 'This is an example note'}))
notes.push(new Note({title:'Coffee with Sarah', content:'This is an example note'}))
notes.push(new Note({title:'The greatest achievement of humankind', content:'The earth is flat'}))

app.get('/notes',  (req: Request, res: Response) => {
    res.send(notes)    
})

//create a new note
app.post('/create', (req: Request, res: Response) => {
    if(req.body.notes !== undefined) {
        try{
            const reqNotes: Note[]  = req.body.notes;
            reqNotes.map(note => {
                notes.push(new Note(note))
                res.status(200).send(notes)
            })
        }catch{
            res.status(500).send('error')
        }
    }else{
        try{
            const note = new Note(req.body.note)
            notes.push(note)
            res.send(note)
        }catch{
            res.send('error')
        }
        
    }
})
//get a note by id
app.get('/note/:id', (req: Request, res: Response) => {
    try{
        const note = notes.find(note => note.id === Number(req.params.id))
        res.status(200).send(note)
    }
    catch{
        res.send('Cannot get note of id: ' + req.params.id)
    }
})

//update a note
app.put('/note/:id', (req: Request, res: Response) => {
    try{
        const note = notes.find(note => note.id === Number(req.params.id))
        const updatedNote = new Note(req.body.note)
        const index = notes.indexOf(note)
        notes[index] = updatedNote
        res.status(200).send(updatedNote)
    }
    catch{
        res.send('Cannot update note of id: ' + req.params.id)
    }
})


app.post('/', (req: Request, res: Response) => {
  console.log(req.body) // e.x. req.body.title 
  res.sendStatus(200).send('POST Hello World')
})

app.listen(3000)