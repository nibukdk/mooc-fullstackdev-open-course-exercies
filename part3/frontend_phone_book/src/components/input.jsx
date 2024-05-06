const InputField = ({ onChangeHandler, value, label }) => (
  <div>
    {label}: <input onChange={onChangeHandler} value={value} label={label}/>
  </div>
);

export default InputField;
