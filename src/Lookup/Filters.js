export const none = (searchText, value) => true;
export const caseInsensitive = (searchText, value) => value.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
