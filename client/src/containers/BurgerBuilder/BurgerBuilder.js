import React, { Component } from "react";
import axios from "axios";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from "react-redux";
import * as actionTypes from "../../store/action";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
  }

  componentDidMount() {
    // axios.get("/api/ingredients")
    //   .then(resp => {
    //     const convertedIng = resp.data.reduce((val, item) => {
    //       const key = Object.keys(item);
    //       val[key] = item[key];
    //       return val;
    //     })
    //     console.log(convertedIng)
    //     // this.setState({ ingredients: convertedIng })
    //   })
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKeys => {
        return ingredients[igKeys];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

      return sum > 0;
  }

  purchasingHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCanselHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    
  }

  // purchaseContinueHandler = () => {
  //   const queryParams = [];
  //   for (let i in this.state.ingredients) {
  //     queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]) )
  //   }
  //   queryParams.push("price=" + this.state.totalPrice.toFixed(2));
  //   const queryString = queryParams.join("&");
  //   this.props.history.push({
  //     pathname: "/checkout",
  //     search: "?" + queryString
  //   });
  // }

  render () {
    const disabledInfo = {
      ...this.props.ingredients
    }
    
    
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
     
    let orderSummary = <OrderSummary
      ingredients={this.props.ingredients}
      price={this.props.totalPrice}
      purchaseContinue={this.purchaseContinueHandler}
      purchaseCancel={this.purchaseCanselHandler}
    />

    if (this.state.loading) {
       orderSummary = <Spinner />
    }
    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCanselHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemove={this.props.onIngredientRemoved}
          disabledInfo={disabledInfo}
          purchasable={this.updatePurchaseState(this.props.ingredients)}
          ordered={this.purchasingHandler}
          price={this.props.totalPrice}
        />
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientsName: ingName }),
    onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientsName: ingName })
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder));
