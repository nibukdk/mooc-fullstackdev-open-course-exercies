const InputField = ({ onChangeHandler, value, label }) => (
  <div>
    {label}: <input onChange={onChangeHandler} value={value} />
  </div>
);

export default InputField;
