import InputField from "./input";

const FilterName = ({ value, filterChangeHandler }) => (
  <InputField
    value={value}
    onChangeHandler={filterChangeHandler}
    label="filter shown with"
  />
);

export default FilterName;
