import moment from "moment";
import { DateTime } from "luxon";
import { useAppContext } from "../context/appContext";
import Tippy from "@tippyjs/react";
import Wrapper from "../assets/wrappers/Job";
import SelectCategoryIcon from "./SelectCategoryIcon";
import { Link } from "react-router-dom";
import ItemInfo from "./ItemInfo";
import { GiWeight } from "react-icons/gi";
import { FaCalendarAlt } from "react-icons/fa";

const ItemClaimed = ({
  _id,
  category,
  name,
  quantity,
  unit,
  expiresOn,
  pickupLocation,
  pickupTime,
}) => {
  //console.log(category);
  const { claimItem } = useAppContext();

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
  let pickupDateTime = DateTime.fromISO(pickupTime);
  pickupDateTime = pickupDateTime.toFormat("MMMM dd, yyyy");

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
          <div>
            <Tippy
              content={
                <div>
                  <div>
                    <b>
                      Pickup Location:
                      {pickupLocation}
                    </b>
                  </div>
                  <div>
                    <b>
                      <span className="pickup">Pickup Time:</span>
                      {pickupDateTime}
                    </b>
                  </div>
                </div>
              }
              theme="tomato"
              placement="right-start"
              maxWidth={200}
              trigger="click"
              hideOnClick="toggle"
            >
              <button type="button" className="btn pickup-btn">
                Pickup Details
              </button>
            </Tippy>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default ItemClaimed;
