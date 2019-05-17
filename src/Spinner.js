import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

const Spinner = () => (
    // place the spinner component in the dimmer component to make it visible
    <Dimmer active>
        <Loader size="huge" content={"Preparing Chat..."} />
    </Dimmer>
);

export default Spinner;
