import React from 'react';
import Title from 'react-title-component';
import CodeExample from '../../../CodeExample';
import MarkdownElement from '../../../MarkdownElement';
import popoverReadmeText from './README';
import PopoverExampleSimple from './ExampleSimple';
import popoverExampleSimpleCode from '!raw!./ExampleSimple';
import popoverNoteText from './NOTE';
import popoverCode from '!raw!versionone-ui/Popover/Popover';
import popoverPackage from 'versionone-ui/Popover/package.json';
import PropTypeDescription from './../../../PropTypeDescription';
import StatusBadge from './../../../StatusBadge';
const descriptions = {
    simple: 'A simple example showing a Popover containing a [Menu](/#/components/menu). It can be also closed by clicking away from the Popover.',
    animation: 'The default animation style is to animate around the origin. An alternative animation can be applied using the `animation` property. Currently one alternative animation is available, `popover-animation-from-top`, which animates vertically.',
    configurable: 'Use the radio buttons to adjust the `anchorOrigin` and `targetOrigin` positions.',
};

const PopoverPage = (props) => (
    <div>
        <Title render={(previousTitle) => `Popover - ${previousTitle}`} />
        <StatusBadge status={popoverPackage.status}/>
        <MarkdownElement text={popoverReadmeText} />
        <CodeExample
            title="Simple example"
            description={descriptions.simple}
            code={popoverExampleSimpleCode}
            openInPlayground={props.openPlayground}>
            <PopoverExampleSimple />
        </CodeExample>
        <MarkdownElement text={popoverNoteText} />
        <PropTypeDescription header="### PropTypes" code={popoverCode} />
    </div>
);
export default PopoverPage;
export const meta = {
    ...popoverPackage,
    title: 'Popover',
    keywords: [],
    'see also': [
        'dropdown',
        'tooltip',
        'select field'
    ]
};