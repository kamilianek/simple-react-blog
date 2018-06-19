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
import faDeletePost from '@fortawesome/fontawesome-free-solid/faTrashAlt';
import faEditPost from '@fortawesome/fontawesome-free-solid/faWrench';

import './style.css';

const icons = {
  like: faThumbsUp,
  dislike: faThumbsDown,
  comment: faComment,
  follow: faFollow,
  deletePost: faDeletePost,
  editPost: faEditPost,
};

const colors = {
  like: 'green',
  deletePost: 'red',
  comment: 'gold',
  follow: 'green',
  edit: 'grey',
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
