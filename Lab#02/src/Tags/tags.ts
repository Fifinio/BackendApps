import express from 'express';
import { Request, Response } from 'express';
import { readFile, writeFile, writeFileSync } from 'fs';
import { Note,Tag } from '../classes';

const tagsRouter = express.Router();

const rootPath = './';
const notesPath = rootPath + './storage/notes/notes.json';
const tagsPath = rootPath + './storage/tags/tags.json';

var notesList: Note[] = [];
readFile(notesPath, (err, data) => {
    if (err) throw err;
    notesList = JSON.parse(data.toString());
});

var tagsList: Tag[] = [];
readFile(tagsPath, (err, data) => {
    if (err) throw err;
    tagsList = JSON.parse(data.toString());
});



//get all tags
tagsRouter.get('/list', (req: Request, res: Response) => {
    try{
        res.status(200).send(tagsList)
    }
    catch(e){
        res.status(500).send(e)
    }
})
//create a new tag
tagsRouter.post('/', (req: Request, res: Response) => {
    try{
        const tag = new Tag(req.body.tag)
        if(tagsList.some(item => item.name === tag.name)){
            res.status(400).send('tag already exists')
        }else{
            tagsList.push(tag)
            writeFile(rootPath +'./storage/tags/tags.json', JSON.stringify(tagsList), (err) => {
                if(err){
                    res.status(500).send(err)
                }
            })
                        
            res.status(200).send(tag)
        }
        console.log(tagsList)
    }
    catch{
        res.send('error')
    }
})

//find a tag by id
tagsRouter.get('/:id', (req: Request, res: Response) => {
    try{
        const tag = tagsList.find(tag => tag.id === req.params.id)
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
tagsRouter.delete('/:id', (req: Request, res: Response) => {
    try{
        tagsList = tagsList.filter(tag => tag.id === req.params.id)
        writeFile(tagsPath, JSON.stringify(tagsList), (err) => {
            if(err){
                res.send('error')
            }
        })
        res.send(tagsList)
        console.log(tagsList)
    }
    catch{
        res.send('Cannot delete tag of id: ' + req.params.id)
    }
})

//update a tag
tagsRouter.put('/:id', (req: Request, res: Response) => {
    try{
        let foundTag = tagsList.find(tag => tag.id === req.params.id)
        console.log(req.params.id)
        if(foundTag){
            foundTag = new Tag({...foundTag, ...req.body.tag})
                writeFile(tagsPath, JSON.stringify({tagsList, ...foundTag}), (err) => {
                    if(err) throw err
                    console.log('tags saved')})
            
            res.status(200).send(foundTag)
        }else{
            res.status(404).send('tag not found')
        }

    }
    catch{
        res.send('Cannot update tag of id: ' + req.params.id)
    }
})

module.exports = tagsRouter;