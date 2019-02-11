import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let transformIngredient = Object.keys(props.ingredients).map(igKeys => {
    return [...Array(props.ingredients[igKeys])].map((_, i) => {
      return <BurgerIngredient key={igKeys + i} type={igKeys} />
    })
  })
  .reduce((arr, el) => {
    return arr.concat(el);
  }, [])
  if (transformIngredient.length === 0) {
    transformIngredient = <p>Please start adding ingredients</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
        {transformIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;
