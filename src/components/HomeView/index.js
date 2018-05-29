/**
 * Created by kamilianek on 28.04.18.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Sizes, Callout, Colors } from 'react-foundation';
import PropTypes from 'prop-types';
import MainView from '../MainView';

class HomeView extends React.Component {
  static propTypes = {
    // From mapStateToProps:
    username: PropTypes.string.isRequired,
  };

  render() {
    return (
      <MainView>
        <div className="callout-sizes-example">
          <Callout color={Colors.SUCCESS} size={Sizes.LARGE}>
            <h5>{`Witaj ${this.props.username} na prostym blogu!`}</h5>
            <p>Teraz możesz przeglądać blogi innych użytkowników</p>
          </Callout>
        </div>
      </MainView>
    );
  }
}

const mapSateToProps = state => ({
  username: state.user.userDetails.email,
});

export default connect(mapSateToProps, null)(HomeView);
