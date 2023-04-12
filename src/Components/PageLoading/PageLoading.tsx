import { FunctionComponent } from "react";
import { CircularProgress } from "@mui/material";

interface Props {}

const PageLoading: FunctionComponent<Props> = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={"40px"} />
    </div>
  );
};

export default PageLoading;
