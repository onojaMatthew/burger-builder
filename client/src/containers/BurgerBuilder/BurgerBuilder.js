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
import * as burgerBuilderActions from "../../store/actions/index";
import Auth from '../../middleware/Auth';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    authenticated: false,
  }

  componentDidMount() {
    this.setState({
      authenticated: Auth.isUserAuthenticated()
    })
    this.props.onInitIngredients();
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
    if (Auth.isUserAuthenticated()) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push("/");
    }
    
   
  }

  purchaseCanselHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
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
    const { authenticated } = this.state;
    const disabledInfo = {
      ...this.props.ingredients
    }
    
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
     
    let orderSummary = null;

    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemove={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchasingHandler}
            price={this.props.totalPrice}
            authenticated={authenticated}
          />
        </Aux>
      )

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
        purchaseContinue={this.purchaseContinueHandler}
        purchaseCancel={this.purchaseCanselHandler}
      />
    }

    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCanselHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    purchased: state.order.purchased
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
