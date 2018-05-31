/**
 * Created by kamilianek on 29.05.18.
 */
import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
import IconButton from '../IconButton';
import CommentsView from '../CommentsView';

class Post extends React.Component {
  static propTypes = {
    post: PropTypes.object,
  };
  static defaultProps = {
    post: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
    };

    this.onCommentButtonClick = this.onCommentButtonClick.bind(this);
  }

  onCommentButtonClick() {
    this.setState((prevState) => {
      return { showComments: !prevState.showComments };
    });
  }

  render() {
    const { post } = this.props;
    const { showComments } = this.state;
    return (
      <div className="post-view-container">
        <div className="text-container">
          { post.text }
        </div>
        <div className="post-action-bar">
          <IconButton type="comment" onPress={this.onCommentButtonClick} />
          <IconButton type="follow" />
        </div>
        { showComments ? <CommentsView postId={post.id} /> : null }
      </div>
    );
  }
}

export default Post;
