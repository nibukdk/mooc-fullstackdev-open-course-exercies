import { useState } from "react";
import Contacts from "./components/contacts";
import Forms from "./components/forms";
import FilterName from "./components/filerName";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "", number: null, id: null },
  ]);
  const [mathcingNumber, setMatchingNumber] = useState([]);
  const [newName, setNewName] = useState("enter name");
  const [newFilterName, setNewFilterName] = useState("enter name to search");
  const [newNumber, setNewNumber] = useState("enter number");

  const onFormSubmitHandler = (e) => {
    e.preventDefault();
    if (checkNameExists(newName)) {
      return alert(`${newName} is already added to the phonebook.`);
    }

    const newNameObj = {
      name: newName,
      number: newNumber,
      id:
        persons[persons.length - 1].id === null
          ? 1
          : persons[persons.length - 1].id + 1,
    };
    const newPersons =
      persons[0].number === null ? [newNameObj] : [...persons, newNameObj];
    setPersons(newPersons);

    setNewName("enter name here...");
    setNewNumber("enter number here...");
  };

  const checkNameExists = (name) => {
    const namesCollection = persons.map((obj) =>
      obj.name
        .split(" ")
        .map((str) => str.toLowerCase())
        .join("_")
    );
    return namesCollection.includes(
      name
        .split(" ")
        .map((str) => str.toLowerCase())
        .join("_")
    );
  };

  const onNameIpnutChangeHandler = (e) => {
    setNewName(e.target.value);
  };

  const onNumberIpnutChangeHandler = (e) => {
    setNewNumber(e.target.value);
  };

  const onFilterChangeHandler = (e) => {
    const matchingNames = persons.filter((obj) =>
      obj.name.includes(e.target.value)
    );
    setMatchingNumber(matchingNames);
    setNewFilterName(e.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterName
        filterChangeHandler={onFilterChangeHandler}
        value={newFilterName}
      />
      <Forms
        formSubmitHandler={onFormSubmitHandler}
        nameIpnutChangeHandler={onNameIpnutChangeHandler}
        numberInputChangeHandler={onNumberIpnutChangeHandler}
        newName={newName}
        newNumber={newNumber}
      />

      <Contacts
        contacts={mathcingNumber.length === 0 ? persons : mathcingNumber}
      />
    </div>
  );
};

export default App;
