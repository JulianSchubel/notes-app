//notes_filter: the structure of the object to be passed as argument to the filter parameter of render_filtered_notes
let filters = {
    searchText: "",
    sortBy: "byEdited"
};

const getFilters = () => filters;

const setFilters =(updates) => {
    if(typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText;
    }

    if(typeof updates.sortBy === 'string') {
        filters.sortBy = updates.sortBy;
    }
}
export {
    getFilters,
    setFilters
}
