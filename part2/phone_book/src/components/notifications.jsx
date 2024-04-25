const Notifications = ({ type, message, onClickHandler }) => {
  const errroStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontStyle: "italic",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return message === null ? null : (
    <div>
      <p style={type === "error" ? errroStyle : successStyle}>
        {message} &nbsp;
        <button onClick={onClickHandler}>Close</button>
      </p>
    </div>
  );
};
export default Notifications;
