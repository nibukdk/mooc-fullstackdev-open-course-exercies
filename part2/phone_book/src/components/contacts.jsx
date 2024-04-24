const Contacts = ({ contacts }) => {
  const namesCollection = contacts
    .map((contact) => contact.name)
    .filter(String);

  if (namesCollection.length === 0) {
    return <h2>Numbers</h2>;
  }
  return (
    <>
      <h2>Numbers</h2>
      {contacts.map((contact) => (
        <p key={contact.id}>
          {contact.name}: {contact.number}
        </p>
      ))}
    </>
  );
};

export default Contacts;
