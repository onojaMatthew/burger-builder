import React, { Component } from "react";
import axios from "axios";
import Order from "../../components/Order/Order";
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';


class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }

  componentDidMount() {
    axios.get("/api/order")
      .then(response => {
        this.setState({ loading: false, orders: response.data })
      })
      .catch(err => {
        this.setState({ loading: false })
      });
  }

  render () {
  
    return (
      <div>
        {this.state.orders.map(order => (
          <Order key={order._id}
            order={order}
          />
        ))}
        
      </div>
    )
  }
}

export default withErrorHandler(Orders);
