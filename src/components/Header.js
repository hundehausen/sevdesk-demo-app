import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  margin: { marginTop: "2rem", marginBottom: "2rem" },
});

function Header({ title }) {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h2" className={classes.margin}>
        {title}
      </Typography>
    </div>
  );
}

export default Header;
