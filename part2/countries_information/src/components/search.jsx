const SearchBar = ({ searchTerm, onSearchTermChangeHandler }) => (
  <>
  Find Countries: <input value={searchTerm} onChange={onSearchTermChangeHandler} />
  
  </>
);

export default SearchBar;
