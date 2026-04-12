import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ViewListIcon from "@material-ui/icons/ViewList";
import LightIcon from "@material-ui/icons/Brightness4";
import DarkIcon from "@material-ui/icons/Brightness7";
import MenuIcon from "@material-ui/icons/Menu";
import BarChartIcon from "@material-ui/icons/BarChart";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: { display: "flex" },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%) !important",
    boxShadow: "0 2px 10px rgba(92,107,192,0.4)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: { display: "none" },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: "#1A1F36 !important",
    color: "#fff",
    borderRight: "none",
    boxShadow: "4px 0 15px rgba(0,0,0,0.1)",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    fontWeight: 800,
    fontSize: "1.4rem",
    letterSpacing: "1px",
    color: "#fff",
  },
  logoIcon: {
    marginRight: "10px",
    fontSize: "1.8rem",
  }
}));

function Sidebar(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    props.darkMode(!darkMode);
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: <DashboardIcon /> },
    { path: "/viewExpense", label: "View Expenses", icon: <ViewListIcon /> },
    { path: "/monthly-report", label: "Monthly Report", icon: <BarChartIcon /> },
  ];

  const drawerListItems = (
    <div>
      {/* Sidebar Logo */}
      <div style={{
        padding: "24px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        marginBottom: "10px"
      }}>
        <Typography style={{ color: "#fff", fontWeight: 800, fontSize: "1.3rem" }}>
          💰 ExpenseSave
        </Typography>
        <Typography style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginTop: "4px" }}>
          Personal Finance Tracker
        </Typography>
      </div>

      <List>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link to={item.path} key={item.path} style={{ textDecoration: "none" }}>
              <ListItem style={{
                margin: "4px 12px",
                borderRadius: "10px",
                width: "calc(100% - 24px)",
                background: isActive
                  ? "linear-gradient(135deg, #5C6BC0, #26C6DA)"
                  : "transparent",
                color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                transition: "all 0.2s ease",
              }}>
                <ListItemIcon style={{
                  color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                  minWidth: "40px"
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            </Link>
          );
        })}

        {/* Dark Mode Toggle */}
        <ListItem
          onClick={handleThemeChange}
          style={{
            margin: "4px 12px",
            borderRadius: "10px",
            width: "calc(100% - 24px)",
            color: "rgba(255,255,255,0.65)",
            cursor: "pointer",
            marginTop: "20px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "20px"
          }}
        >
          <ListItemIcon style={{ color: "rgba(255,255,255,0.65)", minWidth: "40px" }}>
            {darkMode ? <DarkIcon /> : <LightIcon />}
          </ListItemIcon>
          <ListItemText>{darkMode ? "Light Mode" : "Dark Mode"}</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.logo}>
            💰 ExpenseSave
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClick={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper }}
          >
            {drawerListItems}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant="permanent"
            open
          >
            <Toolbar />
            {drawerListItems}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default Sidebar;
