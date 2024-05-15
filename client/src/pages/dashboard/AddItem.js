import { useAppContext } from "../../context/appContext";
import { FormRow, Alert, FormRowSelect } from "../../components";
import { GiInfo } from "react-icons/gi";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import InfoTippy from "../../components/InfoTippy";
import Tippy from "@tippyjs/react";
const AddItem = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    categoryOptions,
    category,
    name,
    quantity,
    unitOptions,
    unit,
    expiresOn,
    handleChange,
    clearValues,
    addItem,
    isLoading,
    editItem,
    setAddItem,
    isDonating,
    pickupTime,
    pickupLocation,
    addAndDonate,
  } = useAppContext();

  const content = "Enter pickup details to directly donate item";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !name || !quantity || !unit || !expiresOn) {
      displayAlert();
      return;
    }

    const status = "mylist";

    const currentItem = {
      category,
      name,
      quantity,
      unit,
      expiresOn,
      status,
    };

    if (isEditing) {
      editItem(currentItem);
      return;
    }

    addItem(currentItem);
  };

  const handleDonate = (e) => {
    e.preventDefault();
    if (
      !category ||
      !name ||
      !quantity ||
      !unit ||
      !expiresOn ||
      !pickupTime ||
      !pickupLocation
    ) {
      displayAlert();
      return;
    }
    const status = "mylist";

    const currentItem = {
      category,
      name,
      quantity,
      unit,
      expiresOn,
      status,
    };
    addAndDonate(currentItem);
  };

  const handleItemInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange({ name, value });
  };

  if (isEditing) {
    return (
      <Wrapper>
        <form className="form">
          <h3>
            {isEditing ? "Edit Item" : "Add Item"}
            <Tippy content={content} placement="right">
              <span className="icon">
                <GiInfo />
              </span>
            </Tippy>
          </h3>

          {showAlert && <Alert />}
          <div className="form-center">
            <FormRow
              type="text"
              labelText="Category"
              name="category"
              value={category}
              handleChange={handleItemInput}
              isEditing={isEditing}
            ></FormRow>
            <FormRow
              type="text"
              labelText="Name"
              name="name"
              value={name}
              handleChange={handleItemInput}
              isEditing={isEditing}
            ></FormRow>
            <br></br>
            <FormRow
              type="text"
              labelText="Quantity"
              name="quantity"
              value={quantity}
              handleChange={handleItemInput}
              isEditing={isEditing}
            ></FormRow>
            <FormRowSelect
              name="unit"
              labelText="Unit"
              value={unit}
              handleChange={handleItemInput}
              list={unitOptions}
              isEditing={isEditing}
            ></FormRowSelect>
            <br></br>

            <FormRow
              type="datetime-local"
              labelText="Pickup Time"
              name="pickupTime"
              value={pickupTime}
              handleChange={handleItemInput}
            ></FormRow>

            <FormRow
              type="text"
              labelText="Pickup Location"
              name="pickupLocation"
              value={pickupLocation}
              handleChange={handleItemInput}
            ></FormRow>
            <br></br>

            <div className="btn-container">
              <button
                className="btn btn-block submit-btn"
                type="submit"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isDonating ? "Donate" : "Submit"}
              </button>
              <div className="btn-container">
                <button
                  className="btn btn-block clear-btn"
                  disabled={isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    clearValues();
                    setAddItem();
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </form>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <form className="form">
        <h3>
          {isEditing ? "Edit Item" : "Add Item"}
          <Tippy content={content} placement="right">
            <span className="icon">
              <GiInfo />
            </span>
          </Tippy>
        </h3>

        {showAlert && <Alert />}
        <div className="form-center">
          <FormRowSelect
            name="category"
            labelText="Category"
            value={category}
            handleChange={handleItemInput}
            list={categoryOptions}
          ></FormRowSelect>
          <FormRow
            type="text"
            labelText="Name"
            name="name"
            value={name}
            handleChange={handleItemInput}
          ></FormRow>
          <br></br>
          <FormRow
            type="text"
            labelText="Quantity"
            name="quantity"
            value={quantity}
            handleChange={handleItemInput}
          ></FormRow>
          <FormRowSelect
            name="unit"
            labelText="Unit"
            value={unit}
            handleChange={handleItemInput}
            list={unitOptions}
          ></FormRowSelect>

          <FormRow
            type="date"
            labelText="Expires On"
            name="expiresOn"
            value={expiresOn}
            handleChange={handleItemInput}
          ></FormRow>

          <FormRow
            type="datetime-local"
            labelText="Pickup Time"
            name="pickupTime"
            value={pickupTime}
            handleChange={handleItemInput}
          ></FormRow>

          <FormRow
            type="text"
            labelText="Pickup Location"
            name="pickupLocation"
            value={pickupLocation}
            handleChange={handleItemInput}
          ></FormRow>
          <br></br>

          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              Submit
            </button>
            <div className="btn-container">
              <button
                className="btn btn-block donate-btn"
                disabled={isLoading}
                onClick={handleDonate}
              >
                Donate
              </button>
              <div className="btn-container">
                <button
                  className="btn btn-block clear-btn"
                  disabled={isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    clearValues();
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddItem;
