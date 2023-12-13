"use strict"

let notes = getSavedNotes();

//notes_filter: the structure of the object to be passed as argument to the filter parameter of render_filtered_notes
let filters = {
    searchText: "",
    sortBy: "byEdited"
};

//Initial render of all notes 
renderNotes(notes, filters);

// an event listener callback function is invoked with an argument representing the event
document.querySelector("#create-note").addEventListener("click", (event) => {
    /* location: inteface representing the URL of the attached object */
    location.assign(`/edit.html#${uuid}`);
});

document.querySelector("#search-text").addEventListener("input", (event) => {
    filters.searchText = event.target.value;
    renderNotes(notes, filters);
});

document.querySelector("#filter-by").addEventListener("change", (event) => {
    filters.sortBy = event.target.value;
    renderNotes(notes, filters);
})

window.addEventListener("storage", (event) => {
   if( event.key === "notes") {
        notes = getSavedNotes();
        renderNotes(notes, filters);
    }
});
