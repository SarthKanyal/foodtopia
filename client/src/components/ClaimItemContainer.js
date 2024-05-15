import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading.js";
import Wrapper from "../assets/wrappers/JobsContainer";
import ItemClaim from "./ItemClaim.js";

const ClaimItemContainer = () => {
  const {
    items,
    totalItems,
    itemClaimed,

    isLoading,

    filterName,
    filterCategory,
    filterSort,
    getDonationList,
  } = useAppContext();
  useEffect(() => {
    getDonationList();
  }, [filterName, filterCategory, filterSort, itemClaimed]);

  if (isLoading) {
    return <Loading center />;
  }

  if (items.length === 0) {
    return (
      <Wrapper>
        <h2>No items found!</h2>
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
            <ItemClaim
              key={item._id}
              _id={item._id}
              name={item.name}
              expiresOn={item.expiresOn}
              category={item.category}
              quantity={item.quantity}
              unit={item.unit}
              pickupLocation={item.pickupLocation}
              pickupTime={item.pickupTime}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};
export default ClaimItemContainer;
