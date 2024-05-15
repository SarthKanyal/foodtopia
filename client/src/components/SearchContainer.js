import FormRow from "./FormRow.js";
import FormRowSelect from "./FormRowSelect.js";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useAppContext } from "../context/appContext";

const SearchContainer = () => {
  const {
    filterSortOptions,
    handleChange,
    filterName,
    filterCategory,
    filterSort,
    categoryOptions,
    isLoading,
    clearMyItemsFilter,
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
        <h3>Filter Results</h3>
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
export default SearchContainer;
