/**
 * Created by kamilianek on 31.05.18.
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';
import { Button, Colors, Sizes } from 'react-foundation';

import './style.css';
import {moment} from "moment";

class CommentsView extends React.Component {
  static propTypes = {
    // From mapStateToProps:
    apiUrl: PropTypes.string.isRequired,
    postId: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      commentText: 'Write your comment',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(`${this.props.apiUrl}/comments/${this.props.postId}`, {
      method: 'GET',
      headers: {
        'x-auth-token': this.props.token,
      },
    }).then(response => response.json()).then((res) => {
      if (res.status === 404) {
        alert('Error while comments loading, try again :(');
      }
      console.log(res);
      this.setState({ comments: res.data });
    }).catch(alert);
  }

  handleChange(event) {
    this.setState({ commentText: event.target.value });
  }

  render() {
    const { comments } = this.state
    return (
      <div className="comments-view">
        <textarea
          className="text-area"
          rows={7}
          maxLength={255}
          value={this.state.commentText}
          onChange={this.handleChange}
        />
        <div className="submit-button">
          <Button
            color={Colors.PRIMARY}
            size={Sizes.SMALL}
            onClick={this.mockLogin}
          >
            Comment
          </Button>
        </div>
        { comments.map(comment => (
          <div className="comment-container">
            <h1>{comment.User.email}</h1>
            <h2>{comment.createdAt}</h2>
            <p>{comment.text}</p>
          </div>
          ))}
      </div>
    );
  }
}

const mapSateToProps = state => ({
  username: state.user.userDetails.email,
  id: state.user.userDetails.state,
  apiUrl: state.user.apiUrl,
  token: state.user.token,
});


export default connect(mapSateToProps, null)(CommentsView);
