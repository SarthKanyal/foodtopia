import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading.js";
import Wrapper from "../assets/wrappers/JobsContainer";
import ItemDonate from "./ItemDonate.js";
import Alert from "./Alert";

const DonateItemContainer = () => {
  const {
    items,
    totalItems,
    page,
    isLoading,
    getAllItems,
    itemDonated,
    filterName,
    filterCategory,
    filterSort,
    showAlert,
  } = useAppContext();
  useEffect(() => {
    getAllItems();
  }, [itemDonated, filterName, filterCategory, filterSort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (items.length === 0) {
    return (
      <Wrapper>
        <h2>No items added yet!</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalItems} item{items.length > 0 && "s"} found
      </h5>
      <div className="items">
        {items.map((item) => {
          return (
            <ItemDonate
              key={item._id}
              _id={item._id}
              name={item.name}
              expiresOn={item.expiresOn}
              category={item.category}
              quantity={item.quantity}
              unit={item.unit}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};
export default DonateItemContainer;
