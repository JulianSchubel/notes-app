"use strict"

// generateNoteDOM: Generate the DOM structure for a note 
const generateNoteDOM = (note) => {
    const noteElement = document.createElement('a');
    const textElement = document.createElement('p');
    const statusElement = document.createElement("p");
    /*
    const buttonElement = document.createElement('button');

    // Setup remove note button
    buttonElement.textContent = 'x';
    buttonElement.id = note.id;
    buttonElement.addEventListener("click", () => {
        removeNote(note.id);
        saveNotes(notes);
        renderNotes(notes, filters);
    })
    noteElement.appendChild(buttonElement);
    */

    // Setup note title text
    noteElement.className = "note";
    noteElement.id = note.id;
    textElement.textContent = (note.title.length === 0) ? "Unnamed Note" : note.title;
    textElement.classList.add("list-item__title");
    // provide the note.id as hash to the URL
    noteElement.setAttribute("href", `/edit.html#${note.id}`);
    noteElement.classList.add("list-item");
    noteElement.appendChild(textElement);
    
    /*  setup the status message */
    statusElement.textContent = generateLastEdited(note.updatedAt);
    statusElement.classList.add("list-item__subtitle");
    noteElement.appendChild(statusElement);
    return noteElement;
}

// sortNotes: sort notes by one of three options provided by the drop down
const sortNotes = (notes, sortBy) => {
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

// renderNotes: render application notes to the DOM.
const renderNotes = (notesArray, filters) => {
    notesArray = sortNotes(notes, filters.sortBy);
    //to clear an element set the innerHTML (the HTML the specific tag contains) to an empty string
    const notesElement = document.querySelector("#notes");
    notesElement.innerHTML = "";

    //determine filtered notes
    const filtered_notes = notesArray.filter( (element) => element.title.toLowerCase().includes(filters.searchText.toLowerCase()));

    if(filtered_notes.length > 0) {
        //render filtered notes
        filtered_notes.forEach( (element) => {
        notesElement.appendChild(generateNoteDOM(element));
        });
    } else {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No notes to show";
        emptyMessage.classList.add("empty-message");
        notesElement.appendChild(emptyMessage);
    }
    return;
}

// generateLastEditedMessage: creates the last edited message from a unix timestamp
const generateLastEdited = (timestamp) => `Last updated ${moment(timestamp).fromNow()}`;
