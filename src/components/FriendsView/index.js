/**
 * Created by kamilianek on 02.06.18.
 */

import React from 'react';
import { Sizes, Callout, Colors } from 'react-foundation';
import MainView from '../MainView';
import WallView from '../WallView';


class FriendsView extends React.Component {
  render() {
    return (
      <MainView>
        <div className="callout-sizes-example">
          <Callout color={Colors.PRIMARY} size={Sizes.LARGE}>
            <h5>Twoi przyjaciele</h5>
            <p>Przeglądaj posty swoich przyjaciół, oglądaj Waszą wspólną tablicę</p>
          </Callout>
          <WallView friendsPosts />
        </div>
      </MainView>
    );
  }
}

export default FriendsView;
