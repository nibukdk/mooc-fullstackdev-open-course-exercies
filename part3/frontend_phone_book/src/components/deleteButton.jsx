
const DeleteContacts = ({ id, onClickHandler }) => {
  return <button onClick={() => onClickHandler(id)}>Delete</button>;
};

export default DeleteContacts;