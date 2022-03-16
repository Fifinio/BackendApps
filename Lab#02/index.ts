import express from 'express'
import {Request, Response} from 'express'

const app = express()

app.use(express.json())

app.get('/',  (req: Request, res: Response) => {
  res.send('GET Hello World')
})
app.post('/', (req: Request, res: Response) => {
  console.log(req.body) // e.x. req.body.title 
  res.sendStatus(200).send('POST Hello World')
})

app.listen(3000)