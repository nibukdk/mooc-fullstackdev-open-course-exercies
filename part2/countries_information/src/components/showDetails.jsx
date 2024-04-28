const ToggleDetailsButton = ({
  toggleButtonValue,
  toggleDetailInformationHandler,
  id,
}) => {
  console.log(toggleButtonValue.id);
  return (
    <button onClick={() => toggleDetailInformationHandler(id)}>
      {toggleButtonValue.id ? "Hide Dedails" : "Show Details"}
    </button>
  );
};
export default ToggleDetailsButton;
