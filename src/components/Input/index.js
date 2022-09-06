const Input = ({ handleChange, placeholder, value }) => (
  <input
    className="uk-input"
    placeholder={placeholder}
    value={value}
    type="text"
    onChange={handleChange}
  />
);

export default Input;
