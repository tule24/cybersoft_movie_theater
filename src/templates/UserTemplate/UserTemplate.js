import React, { Fragment } from 'react'
import { Route } from 'react-router';

export const UserTemplate = (props) => {
  const { Component, ...restProps } = props;
  return <Route {...restProps} render={(propsRoute) => { // location, match, history
    return <Fragment>
      <section className="h-full gradient-form md:h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://ak.picdn.net/shutterstock/videos/22955491/thumb/1.jpg)' }}>
        <div className="h-full w-screen flex items-center justify-center">
          <div className="block bg-white bg-opacity-50 shadow-lg rounded-lg w-3/4">
            <div className="lg:flex lg:flex-wrap g-0">
              <div className="lg:w-6/12 px-4 md:px-0">
                <div className="md:p-4 md:mx-6">
                  <div className="text-center">
                    <img className="mx-auto w-48" src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="logo" />
                    <h4 className="text-5xl font-semibold mt-1 pb-1">CYBER MOVIE</h4>
                  </div>
                  <Component {...propsRoute} />
                </div>
              </div>
              <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-cover bg-center" style={{ backgroundImage: 'url(https://thumbs.gfycat.com/AccurateEcstaticKillifish-size_restricted.gif)' }}>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  }} />
}
