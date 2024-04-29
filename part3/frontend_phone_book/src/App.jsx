import { useState, useEffect } from "react";
import Contacts from "./components/contacts";
import Forms from "./components/forms";
import FilterName from "./components/filerName";
import server from "./components/server";
import Notifications from "./components/notifications";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [mathcingNumber, setMatchingNumber] = useState([]);
  const [newName, setNewName] = useState("enter name");
  const [newFilterName, setNewFilterName] = useState("enter name to search");
  const [newNumber, setNewNumber] = useState("enter number");
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  });

  useEffect(() => {
    server.getAllContacts().then((data) => setPersons(data));
  }, []);

  const onFormSubmitHandler = (e) => {
    e.preventDefault();
    if (checkPerson(newName)) {
      // return alert(`${newName} is already added to the phonebook.`);
      if (
        window.confirm(
          `${newName} already is already added to the phonebook, replace the old number with new one?`
        )
      ) {
        return updatePhoneNumber({
          ...checkPerson(newName),
          number: newNumber,
        });
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    server
      .createContact(newPerson)
      .then((data) => {
        setPersons([...persons, data]);
        setNotification({
          type: "success",
          message: `Successfully created new contact`,
        });
        setShowNotification(true);
      })
      .catch((e) => {
        setNotification({ type: "error", message: JSON.stringify(e) });
        setShowNotification(true);
      });

    setNewName("enter name here...");
    setNewNumber("enter number here...");
  };

  const checkPerson = () => {
    const namesCollection = persons.map((obj) =>
      obj.name
        .split(" ")
        .map((str) => str.toLowerCase())
        .join("_")
    );
    const person = persons.filter(
      (p) =>
        p.name
          .split(" ")
          .map((str) => str.toLowerCase())
          .join("_") ===
        newName
          .split(" ")
          .map((str) => str.toLowerCase())
          .join("_")
    )[0];
    return namesCollection.includes(
      newName
        .split(" ")
        .map((str) => str.toLowerCase())
        .join("_")
    )
      ? person
      : null;
  };

  const onNameIpnutChangeHandler = (e) => {
    setNewName(e.target.value);
  };

  const onNumberIpnutChangeHandler = (e) => {
    setNewNumber(e.target.value);
  };

  const onFilterChangeHandler = (e) => {
    const matchingNames = persons.filter((obj) =>
      obj.name.toLowerCase().includes(e.target.value)
    );
    setMatchingNumber(matchingNames);
    setNewFilterName(e.target.value);
  };

  const onDeleteContactHandler = (id) => {
    const name = persons.find((p) => p.id === id).name;
    const newContacts = [...persons.filter((p) => p.id != id)];
    
    if (window.confirm(`Delete ${name}?`)) {
      server
        .deleteContact(id)
        .then((_) => {
          setPersons(newContacts);
          setNotification({
            type: "success",
            message: `Successfully deleted contact`,
          });
          setShowNotification(true);
        })
        .catch((e) => {
          if (e.response.status === 404) {
            setNotification({
              type: "error",
              message: `${name} is not found in the server.`,
            });
          } else {
            setNotification({
              type: "error",
              message: JSON.stringify(e),
            });
          }
          setPersons(newContacts);
          setShowNotification(true);
        });
    }
  };

  const updatePhoneNumber = (udpatedPerson) => {
    server
      .updateContact(udpatedPerson.id, udpatedPerson)
      .then((data) => {
        setPersons(persons.map((p) => (p.id === data.id ? data : p)));
        setNotification({
          type: "success",
          message: `Successfully updated contact`,
        });
        setShowNotification(true);
      })
      .catch((e) => {
        setNotification({ type: "error", message: JSON.stringify(e) });
        setShowNotification(true);
      });
  };

  const closeNotificationHandler = () => {
    setShowNotification(false);
    setNotification({
      type: null,
      message: null,
    });
  };
  return (
    <div>
      <h2>Phonebook</h2>
      {showNotification ? (
        <Notifications
          type={notification.type}
          message={notification.message}
          onClickHandler={closeNotificationHandler}
        />
      ) : null}
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
        deleteContactHandler={onDeleteContactHandler}
      />
    </div>
  );
};

export default App;
