const PickupTooltip = (pickupLocation, pickupTime) => {
  return (
    <div>
      <div>
        <b>Pickup Location: {pickupLocation}</b>
      </div>
      <div>Pickup Time: {pickupTime}</div>
    </div>
  );
};
export default PickupTooltip;
