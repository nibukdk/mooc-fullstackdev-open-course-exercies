import InputField from "./input";

const Forms = ({
  formSubmitHandler,
  nameIpnutChangeHandler,
  numberInputChangeHandler,
  newName,
  newNumber,
}) => {
  return (
    <>
      <h2>Add a new</h2>
      <form onSubmit={formSubmitHandler}>
        <InputField
          onChangeHandler={nameIpnutChangeHandler}
          value={newName}
          label="name"
        />
        <br />
        <InputField
          onChangeHandler={numberInputChangeHandler}
          value={newNumber}
          label="number"
        />

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default Forms;
