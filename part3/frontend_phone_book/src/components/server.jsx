import axios from "axios";
const BASE_URL = "/api/persons";

const getAllContacts = async () => {
  return axios.get(BASE_URL).then((res) => res.data);
};

const createContact = async (newPerson) => {
  return axios.post(BASE_URL, newPerson).then((res) => res.data);
};

const updateContact = async (id, newPerson) => {
  return axios.put(`${BASE_URL}/${id}`, newPerson).then((res) => res.data);
};

const deleteContact = async (id) => {
  return axios.delete(`${BASE_URL}/${id}`).then((res) => res.data);
};
export default { getAllContacts, createContact, updateContact, deleteContact };
