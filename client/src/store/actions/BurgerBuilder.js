import axios from "axios";

import * as actionTypes from "./actionTypes";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientsName: name
  }
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientsName: name
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get("/api/ingredients")
      .then(resp => {
        dispatch(setIngredients(resp.data[0]));
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed())
      })
  }
}