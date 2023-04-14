import React, { useContext } from "react";
import PageTitles from "../PageTitles/PageTitles";
import { makeStyles } from "tss-react/mui";
import HomeIcon from "@mui/icons-material/Home";
import { UserContext } from "../../contexts/UserContext";
import { AppRouteBooksSearch, AppRouteManageBooks } from "../../AppRoutes";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import HeaderLink from "./components/HeaderLink";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

interface Props {
  title: string;
  icon?: React.ReactNode;
}

const Header: React.FunctionComponent<Props> = ({ title, icon }) => {
  const { classes } = useStyles();
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(undefined);
    navigate("/mybookshelf");
  };

  return (
    <div className={classes.container}>
      <PageTitles title={title} icon={icon || null} />
      <div className={classes.actionsContainer}>
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
      </div>
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
