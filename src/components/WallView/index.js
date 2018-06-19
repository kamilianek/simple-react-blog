/**
 * Created by kamilianek on 29.05.18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'isomorphic-fetch';
import { withAlert } from 'react-alert';
import { Button, Input } from 'reactstrap';
import ReactLoading from 'react-loading';
import './style.css';
import Post from '../Post';
import actions from '../../actions';


const POST_LIMIT = 10;

class WallView extends React.Component {
  static propTypes = {
    apiUrl: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    myPosts: PropTypes.bool,
    friendsPosts: PropTypes.bool,
    didLogout: PropTypes.func.isRequired,
  };
  static defaultProps = {
    myPosts: false,
    friendsPosts: false,
  };


  constructor(props) {
    super(props);

    this.state = {
      newPostText: '',
      offset: 0,
      posts: [],
      isLoading: false,
    };

    this.submitPost = this.submitPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getNextPosts = this.getNextPosts.bind(this);
    this.getPrevPosts = this.getPrevPosts.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.editPost = this.editPost.bind(this);

    this.getNextPosts();
  }

  getNextPosts() {
    this.setState({ isLoading: true });
    const { apiUrl, token } = this.props;
    const { offset } = this.state;
    let endpointType = 'posts/all';

    if (this.props.myPosts) {
      endpointType = `posts/${this.props.id}`;
    }

    if (this.props.friendsPosts) {
      endpointType = 'posts';
    }
    fetch(`${apiUrl}/${endpointType}?offset=${offset}&limit=${POST_LIMIT}`, {
      method: 'GET',
      headers: {
        'x-auth-token': token,
      },
    }).then(response => response.json()).then((res) => {
      if (res.errors && res.errors.status === 401) {
        this.props.didLogout();
        this.props.alert.error('Sesja wygasła, zaloguj się ponownie');
      }
      if (res.status === 404) {
        this.props.alert.error('Nie udało się załadować postów, spróbuj ponownie :(');
      }
      if ((res.data && res.data.length === 0) || (res.data && res.data.length < POST_LIMIT)) {
        this.props.alert.error('To już ostatnia strona');
      }

      this.setState({
        offset: offset + POST_LIMIT,
        posts: [...this.state.posts, ...res.data] || [],
        isLoading: false,
      });
    }).catch(err => this.props.alert.error(err.message));
  }

  setUserToDisplay(id) {
    this.setState({ userToDisplay: id });
  }

  getPrevPosts() {
    const { apiUrl, token } = this.props;
    const { offset } = this.state;
    const newOffset = offset - POST_LIMIT;
    fetch(`${apiUrl}/posts?offset=${newOffset}&limit=${POST_LIMIT}`, {
      method: 'GET',
      headers: {
        'x-auth-token': token,
      },
    }).then(response => response.json()).then((res) => {
      if (res.errors && res.errors.status === 401) {
        this.props.didLogout();
        this.props.alert.error('Sesja wygasła, zaloguj się ponownie');
      }
      if (res.status === 404) {
        this.props.alert.error('Nie udało się załadować postów, spróbuj ponownie :(');
      }
      this.setState({ offset: offset - POST_LIMIT, posts: res.data || [] });
    }).catch(alert);
  }

  handleChange(event) {
    this.setState({ newPostText: event.target.value });
  }

  submitPost() {
    if (this.state.newPostText.length >= 3) {
      fetch(`${this.props.apiUrl}/posts`, {
        method: 'POST',
        headers: {
          'x-auth-token': this.props.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: this.state.newPostText }),
      }).then(response => response.json()).then((res) => {
        if (res.errors && res.errors.status === 401) {
          this.props.didLogout();
          this.props.alert.error('Sesja wygasła, zaloguj się ponownie');
        }
        if (res.status === 404) {
          this.props.alert.error('Błąd podczas publikacji posta, spróbuj ponownie :(');
        }
        const newPosts = Object.assign(
          [],
          [res.data, ...this.state.posts],
        );

        this.setState({ posts: newPosts });
      }).catch(alert);
    } else {
      this.props.alert.error('Nie można opublikować pustego posta');
    }
  }

  deletePost(postId) {
    const { apiUrl, token } = this.props;

    fetch(`${apiUrl}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.errors && res.errors.status === 401) {
        this.props.didLogout();
        this.props.alert.error('Sesja wygasła, zaloguj się ponownie');
      }
      if (res.status === 404) {
        this.props.alert.error('Nie usunąć posta, spróbuj ponownie :(');
      }
      if (res.ok === true) {
        this.props.alert.success('Post usunięty');
        const newPosts = this.state.posts.filter(post => post.id !== postId);
        this.setState({ posts: newPosts });
      }
    }).catch(err => this.props.alert.error(err.message));
  }

  editPost(postId) {
    const { apiUrl, token } = this.props;

  }

  renderPostCreatorView() {
    return (
      <div className="post-creator-container">
        <textarea
          className="text-area"
          rows={7}
          maxLength={255}
          value={this.state.newPost}
          onChange={this.handleChange}
        />
        <Button className="publish-button" color="primary" onClick={this.submitPost}>Publikuj</Button>
      </div>
    );
  }

  render() {
    const { posts, isLoading } = this.state;
    return (
      <div>
        {
          this.props.myPosts ? this.renderPostCreatorView() : null
        }
        <div className="wall-view-container">
          { posts.filter(post => post.text !== null).map(post => (
            <Post
              myPosts={this.props.myPosts}
              onEdit={this.editPost}
              onDelete={this.deletePost}
              post={post}
            />)) }
          { posts.length % POST_LIMIT === 0 && !isLoading ? <Button className="next-button" color="primary" onClick={this.getNextPosts}>Więcej</Button> : null }
          { isLoading ? <ReactLoading className="loading-animation" type="cylon" color="black" height={70} width={70} /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  apiUrl: state.user.apiUrl,
  token: state.user.token,
  id: state.user.userDetails.id,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  didLogout: () => actions.user.didLogout(),
}, dispatch);

export default withAlert(connect(mapStateToProps, mapDispatchToProps)(WallView));
