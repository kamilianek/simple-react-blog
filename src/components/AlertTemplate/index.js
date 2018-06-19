/**
 * Created by kamilianek on 07.06.18.
 */

import React, { Component } from 'react';
import './style.css';

class AlertTemplate extends Component {
  render() {
    const {
      style, options, message, close,
    } = this.props;

    return (
      <div className="alert-style">
        {message}
      </div>
    );
  }
}

export default AlertTemplate;