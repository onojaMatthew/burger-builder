import React from "react";
import classes from "./BuildControls.css";
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: "Bacon", type: "bacon"},
  {label: "Salad", type: "salad"},
  {label: "Cheese", type: "cheese"},
  {label: "Meat", type: "meat"},
]

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label} 
          label={ctrl.label}
          type={ctrl.type}
          disabled={!props.disabledInfo[ctrl.type]}
          added={() => props.ingredientAdded(ctrl.type)}
          remove={() => props.ingredientRemove(ctrl.type)}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >ORDER NOW</button>
    </div>
  )
}

export default buildControls;
