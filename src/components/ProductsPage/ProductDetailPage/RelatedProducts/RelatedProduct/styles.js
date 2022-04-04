import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    // maxWidth: 345, original width style
    maxWidth: "100%",
    boxShadow: "none",
    borderRadius: 0,
  },
  media: {
    height: 0,
    paddingTop: "75%",
  },
  cardActions: {
    display: "flex",
    justifyContent: "center",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
