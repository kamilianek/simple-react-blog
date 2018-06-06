/**
 * Created by kamilianek on 29.05.18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'isomorphic-fetch';
import { Button, Colors, Sizes } from 'react-foundation';
import './style.css';
import Post from '../Post';


class WallView extends React.Component {
  static propTypes = {
    apiUrl: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      posts: [],
    };

    this.getNextPosts();
  }

  getNextPosts() {
    const { apiUrl, token } = this.props;
    const { offset } = this.state;
    console.log('fetching posts...');
    fetch(`${apiUrl}/posts?offset=${offset}&limit=50`, {
      method: 'GET',
      headers: {
        'x-auth-token': token,
      },
    }).then(response => response.json()).then((res) => {
      if (res.status === 404) {
        alert('Error while loading posts, try again :(');
      }
      console.log('fetched: ', res);
      this.setState({ offset: offset + 50, posts: res.data });
    }).catch(alert);
  }

  render() {
    console.log('posts: ', this.state.posts);
    return (
      <div className="wall-view-container">
        {
          this.state.posts.filter(post => post.text !== null).map(post => <Post post={post} />)
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  apiUrl: state.user.apiUrl,
  token: state.user.token,
});

export default connect(mapStateToProps, null)(WallView);
