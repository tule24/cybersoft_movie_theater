import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router';
import { ACCESS_TOKEN } from '../../utils/Constant/settingSystem';

export const CheckoutTemplate = (props) => {
    const { Component, ...restProps } = props;
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return <Redirect to='/login' />
    } else
        return <Route {...restProps} render={(propsRoute) => { // location, match, history
            return <Fragment>
                <Component {...propsRoute} />
            </Fragment>
        }} />
}