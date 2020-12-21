import React from 'react';
import { Tab, TabPanel } from 'kaid'
import Recommend from './recommend'
import Found from './found'

import './index.scss';

function Home() {
  return (
    <div className="home">
      <Tab>
        <TabPanel key="recommend" title="Recommend">
          <Recommend />
        </TabPanel>
        <TabPanel key="found" title="Found">
          <Found />
        </TabPanel>
        <TabPanel key="me" title="Me">
          <div tabIndex="-1">me page</div>
        </TabPanel>
      </Tab>
    </div>
  );
}

export default Home;
