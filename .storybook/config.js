import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';

setAddon(infoAddon);

const req = require.context('./../', true, /Stories\.js$/);

function loadStories() {
    console.log(req);
    req.keys().forEach(req)
}

configure(loadStories, module);
