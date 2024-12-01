import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupIcon from "@mui/icons-material/Group";
import AlbumIcon from "@mui/icons-material/Album";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import CategoryIcon from "@mui/icons-material/Category";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../AdminSlice";

function DSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#373735",
          },
        }}
      >
        <div className="my-4">
          <Link to="/" className="d-flex justify-content-center">
            <img
              src="/equal-vision-logo.png"
              alt=""
              className="ev-sidebar-logo"
            />
          </Link>
        </div>

        <Menu
          menuItemStyles={{
            button: {
              backgroundColor: "none",
              "&:hover": {
                backgroundColor: "#474843",
              },
            },
            root: {
              color: "white",
            },
          }}
        >
          <MenuItem component={<Link to="/" />} icon={<DashboardIcon />}>
            DASHBOARD
          </MenuItem>
          <MenuItem
            component={<Link to="/admins" />}
            icon={<AdminPanelSettingsIcon />}
          >
            ADMINS
          </MenuItem>
          <MenuItem component={<Link to="/users" />} icon={<GroupIcon />}>
            USERS
          </MenuItem>
          <MenuItem component={<Link to="/products" />} icon={<AlbumIcon />}>
            PRODUCTS
          </MenuItem>
          <MenuItem
            component={<Link to="/artists" />}
            icon={<MusicVideoIcon />}
          >
            ARTISTS
          </MenuItem>
          <MenuItem
            component={<Link to="/categories" />}
            icon={<CategoryIcon />}
          >
            CATEGORIES
          </MenuItem>
          <MenuItem
            component={<Link to="/orders" />}
            icon={<ShoppingCartIcon />}
          >
            ORDERS
          </MenuItem>
          <hr className="w-75 mx-auto final-hr" />
          <MenuItem icon={<LogoutIcon />} onClick={handleLogout}>
            LOGOUT
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}

export default DSidebar;
