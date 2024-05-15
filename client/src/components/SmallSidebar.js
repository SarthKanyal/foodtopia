import Wrapper from "../assets/wrappers/SmallSidebar.js";
import { ClearRounded } from "@mui/icons-material";
import { useAppContext } from "../context/appContext.js";

import NavLinks from "../utils/links.js";
import Logo from "./logo";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <ClearRounded />
          </button>
          {/* <header>
            <Logo />
          </header> */}
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
