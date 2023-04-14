import React from "react";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "tss-react/mui";

interface Props {
  linkTo: string;
  icon: React.ReactNode;
  isSelected: boolean;
  title: string;
}

const HeaderLink: React.FunctionComponent<Props> = ({
  linkTo,
  icon,
  isSelected,
  title,
}) => {
  const { classes, cx } = useStyles();
  return (
    <IconButton
      title={title}
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
    height: theme.spacing(7),
    width: theme.spacing(7),
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  isSelected: {
    // backgroundColor: theme.palette.primary.light,
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));
