import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from "./Auth.css";
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from "../../store/actions/index";
import Spinner from '../../components/UI/Spinner/Spinner';

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
    },
    isSignup: true,
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

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { isSignup } = this.state;
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, isSignup)
  }
  render() {
    let formElements = [];
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = formElements.map(formElement => {
      return <Input key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event) => this.handleFormInputChanged(event, formElement.id)}
      />
    })

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    return (
      <div className={classes.Auth}>
        {errorMessage}
        <form onSubmit={this.handleSubmit}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button
          btnType="Danger"
          clicked={this.switchAuthModeHandler}
        >
          SWITH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));
