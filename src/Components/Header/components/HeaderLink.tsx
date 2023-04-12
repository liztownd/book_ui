import React from "react";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "tss-react/mui";

interface Props {
  linkTo: string;
  icon: React.ReactNode;
  isSelected: boolean;
}

const HeaderLink: React.FunctionComponent<Props> = ({
  linkTo,
  icon,
  isSelected,
}) => {
  const { classes, cx } = useStyles();
  return (
    <IconButton
      className={cx(classes.link, {
        [classes.isSelected]: isSelected,
      })}
    >
      <Link to={linkTo}>{icon}</Link>
    </IconButton>
  );
};

export default HeaderLink;

const useStyles = makeStyles({ name: "HeaderLink" })((theme) => ({
  link: {
    height: theme.spacing(6),
    width: theme.spacing(6),
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  isSelected: {
    // backgroundColor: theme.palette.primary.light,
  },
}));
