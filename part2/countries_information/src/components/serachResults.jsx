import ToggleDetailsButton from "./showDetails";

const SearchResult = ({
  countries,
  toggleButtonValue,
  onToggleDetailInformationHandler,
}) => {
  return countries.length > 10 ? (
    <p>Too many matches, specify another filter</p>
  ) : (
    <>
      <ul style={{ listStyle: "none" }}>
        {countries.map((country) => (
          <li key={Math.random() * countries.length}>
            {country}
            &nbsp;
            <ToggleDetailsButton
              key={country}
              toggleButtonValue={toggleButtonValue}
              toggleDetailInformationHandler={onToggleDetailInformationHandler}
              id={country}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchResult;
