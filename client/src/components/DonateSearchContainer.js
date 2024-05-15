import FormRow from "./FormRow.js";
import FormRowSelect from "./FormRowSelect.js";
import { DateTime } from "luxon";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useAppContext } from "../context/appContext";
import Alert from "../components/Alert.js";

const DonateSearchContainer = () => {
  const {
    filterSortOptions,
    filterName,
    filterCategory,
    handleChange,
    pickupTime,
    pickupLocation,
    clearPickupDetails,
    filterSort,
    categoryOptions,
    clearMyItemsFilter,
    isLoading,
    showAlert,
  } = useAppContext();

  const handleFilterChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    // if (name === "pickupTime") {
    //   let isoDateTime = DateTime.fromISO(value);
    //   isoDateTime = isoDateTime.toISO();
    //   console.log(isoDateTime);
    //   handleChange({ name, isoDateTime });
    // }

    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>Donate Item</h3>

        <div className="form-center">
          <FormRow
            type="text"
            name="filterName"
            value={filterName}
            labelText="Name"
            handleChange={handleFilterChange}
          />
          <FormRowSelect
            name="filterCategory"
            value={filterCategory}
            labelText="Category"
            handleChange={handleFilterChange}
            list={categoryOptions}
          ></FormRowSelect>
          <FormRowSelect
            name="filterSort"
            value={filterSort}
            labelText="Sort"
            handleChange={handleFilterChange}
            list={filterSortOptions}
          ></FormRowSelect>

          <FormRow
            type="text"
            name="pickupLocation"
            value={pickupLocation}
            labelText="Enter Pickup Location"
            handleChange={handleFilterChange}
          />
          <FormRow
            type="datetime-local"
            name="pickupTime"
            value={pickupTime}
            labelText="Enter Pickup Time"
            handleChange={handleFilterChange}
          />

          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={() => {
              clearPickupDetails();
              clearMyItemsFilter();
            }}
          >
            Clear
          </button>
        </div>
      </form>
      {showAlert && <Alert />}
    </Wrapper>
  );
};
export default DonateSearchContainer;
