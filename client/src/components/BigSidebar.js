import Wrapper from "../assets/wrappers/BigSidebar.js";
import { useAppContext } from "../context/appContext.js";
import Logo from "./logo";
import NavLinks from "../utils/links.js";
const BigSidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          {/* <header>
            <Logo />
          </header> */}
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
