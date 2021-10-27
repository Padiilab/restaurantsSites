import React from 'react';

import logo from '../header/rest-view.png';

export const Loader = () => {
  return (
    <div className={'wrapperPreLoader'}>
      <div id={'sceneForParallax'} className={'wrapperLogo'}>
        <img alt={'logo'} data-depth={'1.5'} src={logo} />
        <div data-depth={'1'} className={'preLoader spinner-grow text-warning'} />
      </div>
    </div>
  );
};
