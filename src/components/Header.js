import Typography from "@material-ui/core/Typography";

function Header({ title }) {
  return (
    <div>
      <Typography variant="h2">{title}</Typography>
    </div>
  );
}

export default Header;
