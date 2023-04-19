import React, { useContext } from "react";
import PageTitles from "../PageTitles/PageTitles";
import { makeStyles } from "tss-react/mui";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../../contexts/UserContext";
import { AppRouteBooksSearch, AppRouteManageBooks } from "../../AppRoutes";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import HeaderLink from "./components/HeaderLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Menu } from "@mui/material";

interface Props {
  title: string;
  icon?: React.ReactNode;
}

const Header: React.FunctionComponent<Props> = ({ title, icon }) => {
  const { classes } = useStyles();
  const { user, setUser } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(undefined);
    navigate("/mybookshelf");
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div className={classes.container}>
      <PageTitles title={title} icon={icon || null} />
      <Box
        sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        className={classes.actionsContainer}
      >
        <HeaderLink
          title={AppRouteManageBooks.title}
          linkTo={AppRouteManageBooks.path.replace(
            ":userId",
            user?.id.toString() || ""
          )}
          icon={
            <HomeIcon
              color={
                location.pathname.includes("manage") ? "primary" : "secondary"
              }
              className={classes.linkIcon}
            />
          }
          isSelected={location.pathname.includes("manage")}
        />
        <HeaderLink
          title={AppRouteBooksSearch.title}
          linkTo={AppRouteBooksSearch.path.replace(
            ":userId",
            user?.id.toString() || ""
          )}
          icon={
            <ManageSearchIcon
              color={
                location.pathname.includes("search") ? "primary" : "secondary"
              }
              className={classes.linkIcon}
            />
          }
          isSelected={location.pathname.includes("search")}
        />
        <IconButton onClick={handleLogout} title={"Log out"}>
          <LogoutIcon color={"secondary"} />
        </IconButton>
      </Box>

      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="app-menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <MenuItem
            onClick={() => {
              handleCloseNavMenu();
              navigate(
                AppRouteManageBooks.path.replace(
                  ":userId",
                  user?.id.toString() || ""
                )
              );
            }}
          >
            <ListItem>
              <ListItemIcon>
                <HomeIcon
                  color={
                    location.pathname.includes("manage")
                      ? "primary"
                      : "secondary"
                  }
                  className={classes.linkIcon}
                />
              </ListItemIcon>
              <ListItemText>My books</ListItemText>
            </ListItem>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCloseNavMenu();
              navigate(
                AppRouteBooksSearch.path.replace(
                  ":userId",
                  user?.id.toString() || ""
                )
              );
            }}
          >
            <ListItem>
              <ListItemIcon>
                <ManageSearchIcon
                  color={
                    location.pathname.includes("search")
                      ? "primary"
                      : "secondary"
                  }
                  className={classes.linkIcon}
                />
              </ListItemIcon>
              <ListItemText>Search</ListItemText>
            </ListItem>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCloseNavMenu();
              handleLogout();
            }}
          >
            <ListItem>
              <ListItemIcon>
                <LogoutIcon color={"secondary"} />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItem>
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
};

export default Header;

const useStyles = makeStyles({ name: "Header" })((theme) => ({
  container: {
    padding: theme.spacing(2),
    width: "100%",
    display: "flex",
    justifyContents: "space-evenly",
    alignItems: "center",
  },
  actionsContainer: {
    marginRight: theme.spacing(2),
    display: "flex",
    justifyContents: "flex-end",
    alignItems: "center",
  },
  linkIcon: {
    padding: 0,
    marginTop: -4,
    marginRight: -3,
  },
}));
