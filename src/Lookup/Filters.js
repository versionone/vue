const stringStartIndex = 0;

export const none = () => true;
export const caseInsensitive = (searchText, value) => value.toLowerCase().indexOf(searchText.toLowerCase()) >= stringStartIndex;
