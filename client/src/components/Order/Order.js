import React from "react";
import classes from "./Order.css";

const order = (props) => {
  
  return (
    <div className={classes.Order}>
      <p>Ingredient: <span className={classes.Orde}>Salad {props.order.salad}</span> <span className={classes.Orde}>Bacon {props.order.bacon}</span> <span className={classes.Orde}>Meat {props.order.meat}</span> <span className={classes.Orde}>Cheese {props.order.cheese}</span></p>
      <p>Price: <strong>NGN {props.order.totalPrice.toFixed(2)}</strong></p>
    </div>
  );
};

export default order;
