import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAllCountries = async () => {
  return axios.get(BASE_URL)
};

export default { getAllCountries };
