import {randomUUID} from 'crypto';

class User {
    login: string;
    password: string;
    id: string;
    constructor(user: User) {
        this.login = user.login;
        this.password = user.password;
        this.id = randomUUID();
    }
}

class Note {
    title: string
    content: string
    createDate?: Date
    tags?: Tag[]
    id?: string

    constructor(note: Note) {
        this.title = note.title || 'new note'
        this.content = note.content
        this.createDate = note.createDate || new Date();
        this.tags = note.tags || []
        this.id = note.id || randomUUID();
    }
}

class Tag{
    name: string
    id?: string

    constructor(name: string, id?: string) {
        this.name = name
        this.id = id || randomUUID();
    }
}

export {Note, Tag, User};