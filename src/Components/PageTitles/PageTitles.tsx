import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

interface Props {
  title: string;
  icon?: React.ReactNode;
}

const PageTitles: React.FunctionComponent<Props> = ({ title, icon }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.icon}>
        {icon || <AutoStoriesIcon fontSize={"large"} />}
      </div>
      <Typography variant={"h4"}>{title}</Typography>
    </div>
  );
};

export default PageTitles;

const useStyles = makeStyles({ name: "PageTitles" })((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
  },
}));
