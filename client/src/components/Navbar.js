import Wrapper from "../assets/wrappers/Navbar.js";
import { useState } from "react";
import { useAppContext } from "../context/appContext";
import Logo from "./logo";
import { FormatAlignLeft, ArrowDropDownOutlined } from "@mui/icons-material";
import { FaceRounded } from "@mui/icons-material";
const Navbar = () => {
  const { user, toggleSidebar, logoutUser } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <div className="logo-container">
          <button className="toggle-btn" onClick={toggleSidebar}>
            <FormatAlignLeft />
          </button>
          <header>
            <Logo />
          </header>

          {/*<h3 className="logo-text">Dashboard</h3>*/}
        </div>

        <div className="btn-container">
          <button className="btn" onClick={() => setShowLogout(!showLogout)}>
            <FaceRounded />
            {user.name}
            <ArrowDropDownOutlined />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown "}>
            <button className="dropdown-btn" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
