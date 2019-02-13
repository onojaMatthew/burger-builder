import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from "./Auth.css";
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from "../../store/actions/index";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: ""
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: ""
      }
    }
  }

  handleFormInputChanged = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value
      }
    }

    this.setState({ controls: updatedControls });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
  }
  render() {
    let formElements = [];
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    const form = formElements.map(formElement => {
      return <Input
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event) => this.handleFormInputChanged(event, formElement.id)}
      />
    })
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.handleSubmit}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
}
export default connect(null, mapDispatchToProps)(withErrorHandler(Auth, axios));
