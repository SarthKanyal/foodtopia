import moment from "moment";
import { DateTime } from "luxon";
import { useAppContext } from "../context/appContext";
import tippy from "tippy.js";
import Wrapper from "../assets/wrappers/Job";
import SelectCategoryIcon from "./SelectCategoryIcon";
import ItemInfo from "./ItemInfo";
import { GiWeight } from "react-icons/gi";
import { FaCalendarAlt } from "react-icons/fa";

const ItemDonate = ({ _id, category, name, quantity, unit, expiresOn }) => {
  //console.log(category);
  const {
    donateItem,
    pickupTime,
    pickupLocation,
    displayAlert,
    displayDonateSuccess,
  } = useAppContext();

  const handleSubmit = () => {
    if (!pickupTime || !pickupLocation) {
      displayAlert();
      return;
    }

    donateItem(_id);
  };

  //let date = moment(expiresOn).parseZone();
  //date = date.format("MMMM Do, YYYY");

  let date = DateTime.fromISO(expiresOn, { zone: "utc" });
  const frontEndDate = date.toFormat("MMMM dd, yyyy");
  const today = DateTime.local({ zone: "utc" });

  const diff = DateTime.fromISO(expiresOn, { zone: "utc" })
    .diff(today, "days")
    .toObject();

  let headerClass;
  if (Math.ceil(diff.days) < 2) {
    headerClass = "warningHeader";
  }
  if (Math.ceil(diff.days) > 1 && Math.ceil(diff.days) < 5) {
    headerClass = "cautionHeader";
  }

  return (
    <Wrapper>
      <header className={`header ${headerClass}`}>
        <div className="main-icon">
          <SelectCategoryIcon category={category} />
        </div>
        <div className="info">
          <h5>
            <b>{category}</b>
          </h5>
          <p>
            <b>{name}</b>
          </p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <ItemInfo icon={<GiWeight />} text={`${quantity} ${unit}`} />
          <ItemInfo icon={<FaCalendarAlt />} date={frontEndDate} />
        </div>

        <footer>
          <div className="actions">
            <button
              type="button"
              className="btn donate-btn"
              onClick={() => {
                console.log("button clicked");
                handleSubmit();
              }}
            >
              Donate
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default ItemDonate;
