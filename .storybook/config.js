import {configure} from '@kadira/storybook';

const storiesFor = (componentName) => path.join(__dirname, '..', 'src', componentName, 'Stories');
function loadStories() {
    require('./../src/Toolbar/Stories')
}

configure(loadStories, module);