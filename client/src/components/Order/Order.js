import React from "react";
import classes from "./Order.css";

const order = (props) => {
  
  console.log(props.order)
  return (
    <div className={classes.Order}>
      <p>Ingredient: <span>Salad {props.order.salad}</span> <span>Bacon {props.order.bacon}</span> <span>Meat {props.order.meat}</span> <span>Cheese {props.order.cheese}</span></p>
      <p>Price: <strong>NGN {props.order.totalPrice.toFixed(2)}</strong></p>
    </div>
  );
};

export default order;
