import React from "react";
import classes from "./Order.css";

const order = (props) => {
  return (
    <div className={classes.Order}>
      <p>Ingredient: Salad (1)</p>
      <p>Price: <strong>NGN {props.order.totalPrice}</strong></p>
    </div>
  );
};

export default order;
