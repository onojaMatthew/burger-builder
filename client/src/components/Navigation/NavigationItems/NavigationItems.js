import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from './NavigationItem/NavigationItem';
import Auth from '../../../middleware/Auth';

const handleLogout = () => {
  Auth.deauthenticateUser();
  window.location.href = "/"
}

const navigationItems = () => {
  const authenticated = Auth.isUserAuthenticated();
  console.log(authenticated)
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem exact link="/">Burger</NavigationItem>
      {authenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
      {authenticated ? <div style={{ color: "#fff"}} onClick={handleLogout}>Logout</div> : <NavigationItem link="/auth">Authenticate</NavigationItem>}
    </ul>
  )
};

export default navigationItems;
