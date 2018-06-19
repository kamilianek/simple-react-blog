/**
 * Created by kamilianek on 18.06.18.
 */

import React from 'react';
import { Sizes, Callout, Colors } from 'react-foundation';
import MainView from '../MainView';
import WallView from '../WallView';


class MyBlogView extends React.Component {
  render() {
    return (
      <MainView>
        <div className="callout-sizes-example">
          <Callout color={Colors.PRIMARY} size={Sizes.LARGE}>
            <h5>To jest Twój blog</h5>
            <p>Dodawaj posty, pokaż siebie</p>
          </Callout>
          <WallView myPosts />
        </div>
      </MainView>
    );
  }
}

export default MyBlogView;