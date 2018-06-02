/**
 * Created by kamilianek on 29.05.18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.css';
import IconButton from '../IconButton';
import CommentsView from '../CommentsView';
import { followUser } from '../../actions/user';

class Post extends React.Component {
  static propTypes = {
    post: PropTypes.object,
    followUser: PropTypes.func.isRequired,
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
    this.setState(prevState => ({ showComments: !prevState.showComments }));
  }

  render() {
    const { post } = this.props;
    const { showComments } = this.state;
    const userName = `user_${post.authorId}`;
    return (
      <div className="post-view-container">
        <div className="text-container">
          { post.text }
        </div>
        <div className="user-name-label">
          <h3><a href={userName}>{userName}</a></h3>
        </div>
        <div className="post-action-bar">
          <IconButton type="comment" onPress={this.onCommentButtonClick} />
          <IconButton type="follow" onPress={() => this.props.followUser(post.authorId)} />
        </div>
        { showComments ? <CommentsView postId={post.id} /> : null }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  followUser,
}, dispatch);

export default connect(null, mapDispatchToProps)(Post);
