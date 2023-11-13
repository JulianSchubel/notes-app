"use strict" 

const titleElement = document.querySelector("#note-title");
const dateElement = document.querySelector("#note-update-time");
const bodyElement = document.querySelector("#note-body");
const removeElement = document.querySelector("#delete-note");
const returnElement = document.querySelector("#return-from-edit");

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
/* note is a reference to the note in the array with the specified ID */
let note = notes.find( (element) => element.id === noteId);

if (!note) {
    location.assign("/index.html");
}

titleElement.value = note.title;
bodyElement.value = note.text;
dateElement.textContent = `Last updated ${moment(note.updateAt).fromNow()}`;

returnElement.addEventListener("click", () => {
    location.assign("/index.html");
});

removeElement.addEventListener("click", () => {
    removeNote(noteId);
    saveNotes(notes);
    location.assign("/index.html");
});

titleElement.addEventListener("input", (event) => {
    note.title = event.target.value;
    note.updatedAt = moment().valueOf();
    /* only necessary to update the current page */
    dateElement.textContent = generateLastEdited(note.updateAt);
    saveNotes(notes);
});

bodyElement.addEventListener("input", (event) => {
    note.text = event.target.value;
    note.updatedAt = moment().valueOf();
    /* only necessary to update the current page */
    dateElement.textContent = generateLastEdited(note.updateAt);
    saveNotes(notes);
});

/* attach global local storage change for the "noets" key to the window */
window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        notes = getSavedNotes();
        note = notes.find( (element) => element.id === noteId);

        if (!note) {
            location.assign("/index.html");
        }

        titleElement.value = note.title;
        bodyElement.value = note.text;
        dateElement.textContent = generateLastEdited(note.updateAt);
    }
});
