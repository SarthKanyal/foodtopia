import FormRow from "./FormRow.js";
import FormRowSelect from "./FormRowSelect.js";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useAppContext } from "../context/appContext";

const ClaimedListSearchContainer = () => {
  const {
    filterSortOptions,
    handleChange,
    filterName,
    filterCategory,
    filterSort,
    categoryOptions,
    isLoading,
    clearMyItemsFilter,
    filterPickupOptions,
    filterPickup,
  } = useAppContext();

  const handleFilterChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>Claimed Items</h3>
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
            name="filterPickup"
            value={filterPickup}
            labelText="Sort"
            handleChange={handleFilterChange}
            list={filterPickupOptions}
          ></FormRowSelect>
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={clearMyItemsFilter}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default ClaimedListSearchContainer;
