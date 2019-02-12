import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Order from "../../components/Order/Order";
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from "../../store/actions/index";
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }

  componentDidMount() {
    this.props.onFetchOrders();
  }

  render () {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        this.props.orders.map(order => (
          <Order key={order._id}
            order={order}
          />
        ))
      )
    }

    return (
      <div>
        {orders}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
