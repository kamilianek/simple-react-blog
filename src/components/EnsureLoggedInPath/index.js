/**
 * Created by kamilianek on 28.04.18.
 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import EnsureLoggedInContainer from '../EnsureLoggedInContainer';

export default class EnsureLoggedInPath extends Component {
  render() {
    const {
      component: TargetComponent,
      ...rest
    } = this.props;

    console.log('props', this.props)
    return (
      <Route
        {...rest}
        render={props => (
          <EnsureLoggedInContainer {...props}>
            <TargetComponent {...props} />
          </EnsureLoggedInContainer>
        )}
      />
    );
  }
}
