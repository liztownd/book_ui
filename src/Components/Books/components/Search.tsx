import React, {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useContext,
} from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { BooksContext } from "../../../contexts/BooksContext";

interface Props {
  onSubmit: FormEventHandler;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<Props["keyword"]>>;
  author: string;
  setAuthor: Dispatch<SetStateAction<Props["author"]>>;
  title: string;
  setTitle: Dispatch<SetStateAction<Props["title"]>>;
  publisher: string;
  setPublisher: Dispatch<SetStateAction<Props["publisher"]>>;
}

const Search: React.FunctionComponent<Props> = ({
  onSubmit,
  keyword,
  setKeyword,
  author,
  setAuthor,
  title,
  setTitle,
  publisher,
  setPublisher,
}) => {
  const { isSearchLoading } = useContext(BooksContext);
  const { classes } = useStyles();
  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <Grid container spacing={3} className={classes.fieldContainer}>
        <Grid item xs={12} lg={6}>
          <div className={classes.fieldDiv}>
            <Typography className={classes.label}>Keyword: </Typography>
            <TextField
              className={classes.textField}
              value={keyword}
              label={"Keyword"}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className={classes.fieldDiv}>
            <Typography className={classes.label}>Title: </Typography>
            <TextField
              className={classes.textField}
              value={title}
              label={"Title"}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className={classes.fieldDiv}>
            <Typography className={classes.label}>Author: </Typography>
            <TextField
              className={classes.textField}
              value={author}
              label={"Author"}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className={classes.fieldDiv}>
            <Typography className={classes.label}>Publisher: </Typography>
            <TextField
              className={classes.textField}
              value={publisher}
              label={"Publisher"}
              onChange={(event) => setPublisher(event.target.value)}
            />
          </div>
        </Grid>
      </Grid>
      <Button
        title="Search"
        className={classes.searchButton}
        disabled={isSearchLoading}
        type="submit"
        onClick={(event) => onSubmit(event)}
        variant={"contained"}
      >
        Search
      </Button>
    </form>
  );
};

export default Search;

const useStyles = makeStyles({ name: "BookSearch" })((theme) => ({
  fieldDiv: {
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  label: {
    width: "15%",
  },
  textField: {
    flexGrow: 1,
  },
  fieldContainer: {
    marginBottom: theme.spacing(3),
  },
  searchButton: {
    marginLeft: `calc(50% - 200px)`,
    width: "400px",
  },
}));
