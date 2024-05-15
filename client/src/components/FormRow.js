const FormRow = ({ type, name, value, labelText, handleChange, isEditing }) => {
  if (isEditing) {
    return (
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labelText || name}
        </label>
        <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className="form-input"
          disabled={isEditing && (name === "name" || name === "category")}
        ></input>
      </div>
    );
  }

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
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
