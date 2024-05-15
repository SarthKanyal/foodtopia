import { FaCarrot } from "react-icons/fa";
import {
  GiBananaPeeled,
  GiMilkCarton,
  GiChipsBag,
  GiShinyApple,
} from "react-icons/gi";
const SelectCategoryIcon = ({ category }) => {
  if (category === "Vegetable") {
    return <FaCarrot />;
  } else if (category === "Fruit") {
    return <GiShinyApple />;
  } else if (category === "Dairy") {
    return <GiMilkCarton />;
  } else {
    return <GiChipsBag />;
  }
};
export default SelectCategoryIcon;
