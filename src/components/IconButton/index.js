/**
 * Created by kamilianek on 30.05.18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faComment from '@fortawesome/fontawesome-free-solid/faComment';
import faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp';
import faThumbsDown from '@fortawesome/fontawesome-free-solid/faThumbsDown';
import faFollow from '@fortawesome/fontawesome-free-solid/faEye';

import './style.css';

const icons = {
  like: faThumbsUp,
  dislike: faThumbsDown,
  comment: faComment,
  follow: faFollow,
};

const colors = {
  like: 'green',
  dislike: 'red',
  comment: 'gold',
  follow: 'brown',
};

class IconButton extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  render() {
    const { type } = this.props;
    return (
      <div className="menu-icon-container" onClick={this.props.onPress}>
        <FontAwesomeIcon color={colors[type]} icon={icons[type]} size="lg" />
      </div>
    );
  }
}

export default IconButton;
