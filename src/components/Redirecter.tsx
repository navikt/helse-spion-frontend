import React from 'react';
import { Redirect } from 'react-router-dom'

class Redirecter extends React.Component {
  render() {
    return <Redirect to='/personoppslag' />
  }
}

export default (Redirecter);
