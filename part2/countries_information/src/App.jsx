import { useEffect, useState } from "react";
import server from "./components/server";
import SearchBar from "./components/search";
import SearchResult from "./components/serachResults";

function App() {
  const [countriesList, setCountriesList] = useState([]);
  const [countriesNameList, setCountriesNameList] = useState([]);
  const [filteredCountriesList, setFilteredCountriesList] = useState([]);
  const [isDetailsView, setIsDetailsView] = useState({});
  const [detailViewCounrtyId, setDetailViewCounrtyId] = useState(null);
  const [detailViewContent, setDetailViewContent] = useState([]);

  const defaultSearchTerm = "search";
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);

  useEffect(() => {
    server
      .getAllCountries()
      // .then((res) => res.data)
      .then((res) => {
        const allCountriesList = res.data.map((country, i) => {
          return {
            id: country.name.common ?? i,
            name: country.name.common ?? "",
            capital: country.capital?.[0] ?? "",
            languages: country.languages ?? "",
            flagUrl: country.flags.png ?? "",
            population: country.population ?? "",
            area: country.area ?? "",
          };
        });
        //  console.log(allCountriesList);
        setCountriesList(allCountriesList);
        setCountriesNameList(allCountriesList.map((c) => c.name));
        const x = {};
        allCountriesList.forEach((c) => {
          x[c.name] = false;
        });
        setIsDetailsView(x);
      })

      .catch((e) => console.log("Error", e));
    console.log(isDetailsView);
  }, []);

  const onSearchTermChangeHander = (e) => {
    setSearchTerm(e.target.value);
    findMatchingCounries(searchTerm);
  };

  const findMatchingCounries = (searchTerm) => {
    //console.log(countriesNameList);
    setFilteredCountriesList([
      ...countriesNameList.filter((n) =>
        n.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    ]);
  };

  const onToggleDetailInformationHandler = (id) => {
    setIsDetailsView({ ...isDetailsView, id: !isDetailsView.id });

    updateDetialContentView(id);
  };

  const updateDetialContentView = (id) => {
    console.log("isDetailsView.id is: ", isDetailsView.id);
    if (isDetailsView.id) {
      setDetailViewCounrtyId(id);
      setDetailViewContent([...countriesList.filter((c) => c.id === id)]);
    } else {
      setDetailViewCounrtyId(null);
      setDetailViewContent([]);
    }
    console.log("Detail View content: ", detailViewContent);
  };

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChangeHandler={onSearchTermChangeHander}
      />
      <SearchResult
        countries={filteredCountriesList}
        toggleButtonValue={isDetailsView}
        onToggleDetailInformationHandler={onToggleDetailInformationHandler}
      />
    </>
  );
}

export default App;
