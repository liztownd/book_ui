import React, { useContext } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "tss-react/esm/mui";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { AppRouteBooksSearch } from "../../../AppRoutes";

interface Props {}

const AddBookCard: React.FunctionComponent<Props> = () => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant={"h6"}>
          Oh no! You don't have any Books yet! Go add one...
        </Typography>
        <Button
          title="Go to search"
          variant={"contained"}
          className={classes.button}
          onClick={() =>
            navigate(
              AppRouteBooksSearch.path.replace(
                "userId",
                user?.id.toString() || ""
              )
            )
          }
        >
          Add
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddBookCard;

const useStyles = makeStyles({ name: "BookCard" })((theme) => ({
  card: {
    width: "100%",
    margin: theme.spacing(2),
    maxWidth: "300px",
    // maxHeight: "400px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(2),
    width: "100%",
  },
}));
