let notes = []
import { v4 as uuidv4 } from "uuid";
import moment from "moment";


// loadNotes: Read existing notes from local storage
const loadNotes = () => {
    const notesJSON = localStorage.getItem("notes");
    try {
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (error) {
        return [];
    }
}

notes = loadNotes();

// saveNotes: Write notes to local storage
const saveNotes = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
}

/* removeNote: remove a note based on its ID */
const removeNote = (noteId) => {
    console.log("remove note");
    const noteIndex = notes.findIndex( (element) => element.id === noteId);

    /* remove the note */
    if(noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes();
    };
    return;
}

/* expose notes from the module */
const getNotes = () => notes;

const createNote = () => {
    const uuid = uuidv4();
    const timestamp = moment().valueOf();
    notes.push(
        {
            id: uuid,
            title: "",
            text: "",
            createdAt: timestamp,
            updatedAt: timestamp
        }
    );
    saveNotes(notes);
    return uuid;
}

// sortNotes: sort notes by one of three options provided by the drop down
const sortNotes = (sortBy) => {
    if(sortBy === "byEdited") {
        return notes.sort( (a, b) => {
            if(a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if(sortBy === "byCreated") {
        return notes.sort( (a, b) => {
            if(a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if(sortBy === "alphabetical") {
        return notes.sort( (a,b) => {
            if(a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else {
                return 0;
            }
        })
    }
    else {
        return notes;
    }
}

const updateNote = (noteId, updates) => {
    const note = notes.find( (note) => note.id === noteId);

    if(!note) {
        return;
    }

    if(typeof updates.title === 'string') {
        note.title = updates.title;
        note.updateAt = moment().valueOf();
    }

    if(typeof updates.body === 'string') {
        note.body = updates.body;
        note.updateAt = moment().valueOf();
    }

    saveNotes();
    return note;
}


export {
    getNotes,
    createNote,
    removeNote,
    sortNotes,
    updateNote
}
