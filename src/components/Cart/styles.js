import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: "3%",
    marginBottom: "5%",
    whiteSpace: "nowrap",
    textAlign: "center",
  },
  emptyButton: {
    minWidth: "150px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5px",
    },
    [theme.breakpoints.up("xs")]: {
      marginRight: "20px",
    },
  },
  checkoutButton: {
    minWidth: "150px",
  },
  link: {
    textDecoration: "none",
    fontWeight: "bold",
  },
  cardDetails: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "10%",
    marginBottom: "10%",
    width: "100%",
    justifyContent: "space-between",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20rem 0",
  },
}));
