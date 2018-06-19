/**
 * Created by kamilianek on 29.05.18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withAlert } from 'react-alert';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import './style.css';
import actions from '../../actions';
import IconButton from '../IconButton';
import CommentsView from '../CommentsView';

class Post extends React.Component {
  static propTypes = {
    post: PropTypes.object,
    apiUrl: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    myPosts: PropTypes.bool,
    role: PropTypes.string,
    didLogout: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
  };
  static defaultProps = {
    post: {},
    myPosts: false,
    role: 'user',
    onDelete: () => null,
    onEdit: () => null,
  };

  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      followId: false,
      deleteModal: false,
      unfollowModal: false,
    };

    this.onCommentButtonClick = this.onCommentButtonClick.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.toggleUnfollowModal = this.toggleUnfollowModal.bind(this);
    this.getFollowersList = this.getFollowersList.bind(this);
    this.handleFollowClick = this.handleFollowClick.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
  }

  onCommentButtonClick() {
    this.setState(prevState => ({ showComments: !prevState.showComments }));
  }

  getFollowersList() {
    const { post, apiUrl, token } = this.props;
    const authorId = post.User ? post.User.id : post.authorId;
    return fetch(`${apiUrl}/follows`, {
      method: 'GET',
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    }).then(response => response.json()).then((res) => {
      if (res.errors && res.errors.status === 401) {
        this.props.didLogout();
        this.props.alert.error('Sesja wygasła, zaloguj się ponownie');
      }
      if (res.status === 404) {
        this.props.alert.error('Nie udało się zaobserwować użytkownika :(');
      } else {
        const follIds = res.data
          .map(foll => (foll.userId === authorId ? foll.id : null))
          .filter(id => !!id);
        if (follIds.length > 0) {
          this.setState({ followId: follIds[0] });
          this.toggleUnfollowModal();
        } else {
          this.followUser();
        }
      }
    }).catch(err => this.props.alert.error(err.message));
  }

  followUser() {
    const { post, apiUrl, token } = this.props;
    const authorId = post.User ? post.User.id : post.authorId;

    fetch(`${apiUrl}/follows/${authorId}`, {
      method: 'POST',
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    }).then(response => response.json()).then((res) => {
      if (res.status === 404) {
        this.props.alert.error('Nie udało się zaobserwować użytkownika :(');
      } else {
        this.props.alert.success('Użytkownik zaobserwowany');
      }
    }).catch(err => this.props.alert.error(err.message));
  }

  unfollowUser() {
    const { apiUrl, token } = this.props;
    fetch(`${apiUrl}/follows/${this.state.followId}`, {
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
        this.props.alert.success('Użytkownik usunięty z listy');
      }
    }).catch(err => this.props.alert.error(err.message));
  }

  toggleDeleteModal() {
    this.setState({ deleteModal: !this.state.deleteModal });
  }
  toggleUnfollowModal() {
    this.setState({ unfollowModal: !this.state.unfollowModal });
  }

  handleFollowClick() {
    this.getFollowersList();
  }

  render() {
    const { post, role, myPosts } = this.props;
    const { showComments, deleteModal, unfollowModal } = this.state;
    const authorId = post.User ? post.User.id : post.authorId;
    const userName = `user_${authorId}`;

    return (
      <div className="post-view-container">
        <div className="text-container">
          { post.text }
        </div>
        <div className="user-name-label">
          <h3>{userName}</h3>
        </div>
        <div className="post-action-bar">
          <IconButton type="comment" onPress={this.onCommentButtonClick} />
          <IconButton type="follow" onPress={() => this.handleFollowClick()} />
          { myPosts || role === 'admin' ? <IconButton type="deletePost" onPress={() => this.toggleDeleteModal()} /> : null }
          { myPosts ? <IconButton type="editPost" onPress={() => this.props.onEdit(post.id)} /> : null }
        </div>
        { showComments ? <CommentsView postId={post.id} /> : null }


        <Modal isOpen={deleteModal} toggle={this.toggleDeleteModal}>
          <ModalHeader>Uwaga!</ModalHeader>
          <ModalBody>Czy jesteś pewien, że chcesz na stałe usunąć tego posta?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => { this.props.onDelete(post.id); this.toggleDeleteModal(); }}>Usuń</Button>{' '}
            <Button color="primary" onClick={() => this.toggleDeleteModal()}>Anuluj</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={unfollowModal} toggle={this.toggleUnfollowModal}>
          <ModalHeader>Obserwujesz tego użytkownika</ModalHeader>
          <ModalBody>
            Jeśli przestaniesz go obserwować,
            jego posty nie będą pojawiać się
            na Twojej tablicy przyjaciół
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggleUnfollowModal()}>Obserwuj</Button>{' '}
            <Button color="secondary" onClick={() => { this.unfollowUser(); this.toggleUnfollowModal(); }}>Zaprzestań</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  apiUrl: state.user.apiUrl,
  token: state.user.token,
  userId: state.user.userDetails.id,
  role: state.user.userDetails.role,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  didLogout: () => actions.user.didLogout(),
}, dispatch);

export default withAlert(connect(mapStateToProps, mapDispatchToProps)(Post));
