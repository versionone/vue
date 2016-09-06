import React from 'react';
import Title from 'react-title-component';
import CodeExample from '../../../CodeExample';
import MarkdownElement from '../../../MarkdownElement';
import componentReadmeText from './README';
import ExampleSimple from './TooltipExampleSimple';
import ExampleSimpleCode from '!raw!./TooltipExampleSimple';
import noteText from './NOTE';
//hack start
import exampleCode from '!raw!vue/Popover/Popover';
import componentPackage from 'vue/Popover/package.json';
// hack end
import PropTypeDescription from './../../../PropTypeDescription';
import StatusBadge from './../../../StatusBadge';
const descriptions = {
    simple: 'A simple example showing a Tooltip.',
};

const ExamplePage = (props) => (
    <div>
        <Title render={(previousTitle) => `Tooltip - ${previousTitle}`} />
        <StatusBadge status="deprecated"/>
        <MarkdownElement text={componentReadmeText} />
        <CodeExample
            title="Simple example"
            description={descriptions.simple}
            code={ExampleSimpleCode}
            openInPlayground={props.openPlayground}>
            <ExampleSimple />
        </CodeExample>
        <MarkdownElement text={noteText} />
        <PropTypeDescription header="## PropTypes" code={exampleCode} />
    </div>
);
export default ExamplePage;