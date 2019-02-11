import React, { Component } from "react";
import axios from "axios";
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapperContainer) => {
  return class extends Component {
    state = {
      error: null
    }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error })
      });
    }

    componentWillUnmount() {
      axios.interceptors.response.eject(this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor)
    }

    confirmErrorHandler = () => {
      this.setState({ error: null });
    }

    render () {

      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalCosed={this.confirmErrorHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperContainer {...this.props} />
        </Aux>
      );
    }
  } 
}
export default withErrorHandler;
