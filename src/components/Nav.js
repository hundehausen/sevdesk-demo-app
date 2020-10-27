import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TimelineIcon from "@material-ui/icons/Timeline";
import InfoIcon from "@material-ui/icons/Info";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

const useStyles = makeStyles({
  root: {},
});

function Nav({ view, setView }) {
  const classes = useStyles();

  return (
    <BottomNavigation
      value={view}
      onChange={(event, newValue) => {
        setView(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} />
      <BottomNavigationAction label="Bitcoin Details" icon={<InfoIcon />} />
      <BottomNavigationAction
        label="Bitcoin Umrechner"
        icon={<DragIndicatorIcon />}
      />
      <BottomNavigationAction
        label="Bitcoin Diagramm"
        icon={<TimelineIcon />}
      />
    </BottomNavigation>
  );
}

export default Nav;
