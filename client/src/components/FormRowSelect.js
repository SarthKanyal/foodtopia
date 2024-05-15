const FormRowSelect = ({ name, value, labelText, handleChange, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>

      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((value, index) => {
          return (
            <option key={index} value={value}>
              {value}
            </option>
          );
        })}
        <option key={list.length} value="" selected></option>;
      </select>
    </div>
  );
};

export default FormRowSelect;
