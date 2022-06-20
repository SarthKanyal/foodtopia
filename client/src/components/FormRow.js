const FormRow = ({ type, name, value, labelText, handleChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name || labelText}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      ></input>
    </div>
  );
};
export default FormRow;
