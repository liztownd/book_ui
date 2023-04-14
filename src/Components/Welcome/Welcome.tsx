import {
  FunctionComponent,
  FormEventHandler,
  useState,
  useContext,
  useEffect,
} from "react";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { UserContext } from "../../contexts/UserContext";
import { AppRouteManageBooks } from "../../AppRoutes";
import PageTitles from "../PageTitles/PageTitles";
import PageContainer from "../PageContainers/PageContainer";

interface Props {}

const Welcome: FunctionComponent<Props> = () => {
  const { login, user, isUserLoading } = useContext(UserContext);
  const { classes } = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    login(email);
  };

  useEffect(() => {
    if (user) {
      navigate(
        `${AppRouteManageBooks.path.replace(":userId", user.id.toString())}`
      );
    }
  }, [user]);

  return (
    <PageContainer>
      <div className={classes.root}>
        <PageTitles title={"Welcome!"} />
        <div className={classes.splitLayoutContainer}>
          <form onSubmit={onSubmit} className={classes.loginContainer}>
            <Typography variant={"h6"}>Please log in.</Typography>
            <TextField
              label={"Email"}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label={"Password"}
              value={password}
              type={"password"}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              disabled={isUserLoading}
              title="Log in"
              type={"submit"}
              onClick={onSubmit}
              variant={"contained"}
              color={"primary"}
            >
              {isUserLoading ? (
                <CircularProgress color={"secondary"} />
              ) : (
                "Log in"
              )}
            </Button>
          </form>
          <div className={classes.textContainer}>
            <Typography variant={"h6"} gutterBottom>
              Welcome to my little app!
            </Typography>
            <Typography variant={"body1"}>
              This is a book search and bookshelf where you can view, rate, and
              save your favorite books. Log in at the left - don't worry, if you
              don't have an account already we'll create one for you!
            </Typography>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Welcome;

const useStyles = makeStyles({ name: "Welcome" })((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    margin: "20px",
  },
  splitLayoutContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gridTemplateColumns: "400px 1fr",
    gridTemplateAreas: "login text",
  },
  loginContainer: {
    gridArea: "login",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    width: "100%",
    minWidth: "300px",
    height: "400px",
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: 20,
  },
  textContainer: {
    gridArea: "text",
    margin: theme.spacing(2, 4),
    overflow: "auto",
  },
}));
