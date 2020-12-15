import React from 'react';
import { Tab, TabPanel } from 'kaid'
import Playlist from '../playlist'
import SongList from '../songlist'

import './index.scss';

function Home() {
  return (
    <div className="home">
      <Tab>
        <TabPanel key="playlist" title="Playlist">
          <Playlist />
        </TabPanel>
        <TabPanel key="songlist" title="Song">
          <SongList />
        </TabPanel>
        <TabPanel key="found" title="Found">
          <div tabIndex="-1">This is FMLIST</div>
        </TabPanel>
      </Tab>
    </div>
  );
}

export default Home;
