import moment from "moment";
import { DateTime } from "luxon";
import { useAppContext } from "../context/appContext";

import Wrapper from "../assets/wrappers/Job";
import SelectCategoryIcon from "./SelectCategoryIcon";
import { Link } from "react-router-dom";
import ItemInfo from "./ItemInfo";
import { GiWeight } from "react-icons/gi";
import { FaCalendarAlt } from "react-icons/fa";

const Item = ({ _id, category, name, quantity, unit, expiresOn }) => {
  //console.log(category);
  const { setEditItem, deleteItem } = useAppContext();

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
            <Link
              to="/additems"
              onClick={() => {
                setEditItem(_id);
              }}
              className="btn edit-btn"
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => {
                deleteItem(_id);
              }}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Item;
