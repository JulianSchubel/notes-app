"use strict"

import moment from "moment";
import {
    getFilters
} from "./filters.js";

import {
    sortNotes,
    getNotes
} from "./notes.js"

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


// renderNotes: render application notes to the DOM.
const renderNotes = () => {
    const filters = getFilters();
    const notesArray = sortNotes(filters.sortBy);
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

const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector("#note-title");
    const dateElement = document.querySelector("#note-update-time");
    const bodyElement = document.querySelector("#note-body");
    //const removeElement = document.querySelector("#delete-note");
    //const returnElement = document.querySelector("#return-from-edit");

    const notes = getNotes();
    /* note is a reference to the note in the array with the specified ID */
    const note = notes.find( (element) => element.id === noteId);

    if (!note) {
        location.assign("/index.html");
    }

    titleElement.value = note.title;
    bodyElement.value = note.text;
    dateElement.textContent = `Last updated ${moment(note.updateAt).fromNow()}`;
}

export {
    generateNoteDOM,
    renderNotes,
    generateLastEdited,
    initializeEditPage
}
