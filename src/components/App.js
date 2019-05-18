import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import './App.css';

import ColourPanel from './ColourPanel/ColourPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

const App = () => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>
    <ColourPanel />
    <SidePanel />

    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages />
    </Grid.Column>

{/* note that semantic ui makes use of a 16 point / colum grid system */}
    <Grid.Column width={4}>
      <MetaPanel />
    </Grid.Column>
  </Grid>
);

export default App;
