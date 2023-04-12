import React from "react";
import { makeStyles } from "tss-react/mui";

interface Props {}

const PageContainer: React.FunctionComponent<Props> = ({ children }) => {
  const { classes } = useStyles();
  return <div className={classes.main}>{children}</div>;
};

export default PageContainer;

const useStyles = makeStyles({ name: "PageContainer" })((theme) => ({
  main: {
    margin: theme.spacing(0, 3),
    padding: theme.spacing(1, 3),
  },
}));
