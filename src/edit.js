"use strict" 

import {
    initializeEditPage,
    generateLastEdited
} from "./views.js"

import {
    updateNote,
    removeNote
} from "./notes.js"

const titleElement = document.querySelector("#note-title");
const dateElement = document.querySelector("#note-update-time");
const bodyElement = document.querySelector("#note-body");
const removeElement = document.querySelector("#delete-note");
const returnElement = document.querySelector("#return-from-edit");

const noteId = location.hash.substring(1);
initializeEditPage(noteId);

returnElement.addEventListener("click", () => {
    location.assign("/index.html");
});

removeElement.addEventListener("click", () => {
    removeNote(noteId);
    location.assign("/index.html");
});

titleElement.addEventListener("input", (event) => {
    const note = updateNote(noteId, {
        title: event.target.value
    });
    /* only necessary to update the current page */
    dateElement.textContent = generateLastEdited(note.updateAt);
});

bodyElement.addEventListener("input", (event) => {
    const note = updateNote(noteId, {
        body: event.target.value
    });
    /* only necessary to update the current page */
    dateElement.textContent = generateLastEdited(note.updateAt);
});

/* attach global local storage change for the "noets" key to the window */
window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        initializeEditPage(noteId);
    }
});
