import React, { Fragment } from 'react'
import { Route } from 'react-router';
import Footer from './Layouts/Footer/Footer';
import Header from './Layouts/Header/Header';

export const HomeTemplate = (props) => {
  const { Component, ...restProps } = props;
  return <Route {...restProps} render={(propsRoute) => { // location, match, history
    return <Fragment>
      <Header />
      <Component {...propsRoute} />
      <Footer />
    </Fragment>
  }} />
}
