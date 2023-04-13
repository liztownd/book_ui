import React, { useContext } from "react";
import PageTitles from "../PageTitles/PageTitles";
import { makeStyles } from "tss-react/mui";
import HomeIcon from "@mui/icons-material/Home";
import { UserContext } from "../../contexts/UserContext";
import { AppRouteBooksSearch, AppRouteManageBooks } from "../../AppRoutes";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import HeaderLink from "./components/HeaderLink";
import { useLocation } from "react-router-dom";

interface Props {
  title: string;
  icon?: React.ReactNode;
}

const Header: React.FunctionComponent<Props> = ({ title, icon }) => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const location = useLocation();

  return (
    <div className={classes.container}>
      <PageTitles title={title} icon={icon || null} />
      <div className={classes.actionsContainer}>
        <HeaderLink
          linkTo={AppRouteManageBooks.path.replace(
            ":userId",
            user?.id.toString() || ""
          )}
          icon={
            <HomeIcon
              color={
                location.pathname.includes("manage") ? "secondary" : "primary"
              }
              className={classes.linkIcon}
            />
          }
          isSelected={location.pathname.includes("manage")}
        />
        <HeaderLink
          linkTo={AppRouteBooksSearch.path.replace(
            ":userId",
            user?.id.toString() || ""
          )}
          icon={
            <ManageSearchIcon
              color={
                location.pathname.includes("search") ? "secondary" : "primary"
              }
              className={classes.linkIcon}
            />
          }
          isSelected={location.pathname.includes("search")}
        />
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
