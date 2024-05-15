import {
  QueryStatsRounded,
  CategoryRounded,
  PostAddOutlined,
  ManageAccountsOutlined,
  LibraryAddCheckOutlined,
  VolunteerActivismOutlined,
  DownloadOutlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, text: "My Items", path: "/", icon: <CategoryRounded /> },
  { id: 2, text: "Add Items", path: "additems", icon: <PostAddOutlined /> },
  //{ id: 3, text: "Stats", path: "showstats", icon: <QueryStatsRounded /> },

  {
    id: 4,
    text: "Claim Items",
    path: "claimitems",
    icon: <DownloadOutlined />,
  },
  {
    id: 5,
    text: "Donate Items",
    path: "donateitems",
    icon: <VolunteerActivismOutlined />,
  },
  {
    id: 6,
    text: "Claimed Items",
    path: "myclaimeditems",
    icon: <LibraryAddCheckOutlined />,
  },
  { id: 7, text: "Profile", path: "profile", icon: <ManageAccountsOutlined /> },
];

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) => {
              return isActive ? "nav-link active" : "nav-link";
            }}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
