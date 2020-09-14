import React from 'react';
import { Redirect, useLocation } from 'react-router-dom'

const Redirecter = () => {
  const location: any = useLocation();
  const params = location && location.search ? location.search : '';

  return <Redirect to={'/personoppslag' + params} />
}

export default Redirecter;
