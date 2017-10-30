import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import moment from 'moment';

import { getDataFromServer } from '~actions';

class App extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    getDataFromServer: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getDataFromServer();
  }

  getUsersList(users) {

    const time = moment().format('hh:mm:ss');

    return users.map((item, i) => {
      return <h1 key={i}>User: {item} - Time: {time}</h1>;
    });

  }

  render() {

    const { users } = this.props.data;
    if (!users) return (<div/>);

    return (
      <ul>
        {this.getUsersList(users)}
      </ul>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getDataFromServer: () => dispatch(getDataFromServer()),
  }, dispatch);
};

function mapStateToProps(state) {
  return {
    data: state.data,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
