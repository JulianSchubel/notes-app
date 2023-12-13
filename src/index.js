"use strict"

import { 
    createNote,
} from "./notes.js";

import {
    setFilters
} from "./filters.js"

import {
    renderNotes
} from "./views.js"

//Initial render of all notes 
renderNotes();

// an event listener callback function is invoked with an argument representing the event
document.querySelector("#create-note").addEventListener("click", (event) => {
    const uuid = createNote();
    /* location: inteface representing the URL of the attached object */
    location.assign(`/edit.html#${uuid}`);
});

document.querySelector("#search-text").addEventListener("input", (event) => {
    setFilters({
        searchText: event.target.value
    });
    renderNotes(notes, filters);
});

document.querySelector("#filter-by").addEventListener("change", (event) => {
    setFilters({
        sortBy: event.target.value
    });
    renderNotes(notes, filters);
})

window.addEventListener("storage", (event) => {
   if( event.key === "notes") {
        renderNotes();
    }
});
