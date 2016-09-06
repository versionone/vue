import React from 'react';
import Title from 'react-title-component';
import * as Toolbar from 'vue/Toolbar';
import CodeExample from '../../../CodeExample';
import MarkdownElement from '../../../MarkdownElement';
import readme from './README';
import ExampleSimple from './ExampleSimple';
import exampleSimpleCode from '!raw!./ExampleSimple';
import ExampleToolbarGroupsAndSeparators from './ExampleToolbarGroupsAndSeparators';
import exampleToolbarGroupsAndSeparatorsCode from '!raw!./ExampleToolbarGroupsAndSeparators';
import ExampleWithSpacer from './ExampleWithSpacer';
import exampleWithSpacer from '!raw!./ExampleWithSpacer';
import toolbarCode from '!raw!vue/Toolbar/Toolbar';
import toolbarGroupCode from '!raw!vue/Toolbar/ToolbarGroup';
import toolbarItemCode from '!raw!vue/Toolbar/ToolbarItem';
import toolbarSeparatorCode from '!raw!vue/Toolbar/ToolbarSeparator';
import toolbarTitleCode from '!raw!vue/Toolbar/ToolbarTitle';
import pkg from 'vue/Toolbar/package.json';
import PropTypeDescription from './../../../PropTypeDescription';
import StatusBadge from './../../../StatusBadge';
const descriptions = {
    simple: 'A simple example showing a `Toolbar` containing a `ToolbarItem`, a `ToolbarSeparator` and a few other controls.',
    grouping: '`ToolbarItem`s may also be grouped together within a `ToolbarGroup`.',
    spacer: 'Toolbar items may be distributed horizontally via `ToolbarSpacer`s. Spacers take up all the remaining empty space. When multiple spacers are present, each spacer is the same width and collectively expand to the empty space.'
};

const ToolbarPage = (props) => (
    <div>
        <Title render={(previousTitle) => `Toolbar - ${previousTitle}`} />
        <StatusBadge status={pkg.status}/>
        <MarkdownElement text={readme} />
        <CodeExample
            title="Simple example"
            description={descriptions.simple}
            code={exampleSimpleCode}
            openInPlayground={props.openPlayground}>
            <ExampleSimple />
        </CodeExample>
        <CodeExample
            title="Grouping example"
            description={descriptions.grouping}
            code={exampleToolbarGroupsAndSeparatorsCode}
            openInPlayground={props.openPlayground}>
            <ExampleToolbarGroupsAndSeparators />
        </CodeExample>
        <CodeExample
            title="Spacer example"
            description={descriptions.spacer}
            code={exampleWithSpacer}
            openInPlayground={props.openPlayground}>
            <ExampleWithSpacer />
        </CodeExample>
        <PropTypeDescription header="### PropTypes Toolbar" code={toolbarCode} />
        <PropTypeDescription header="### PropTypes ToolbarTitle" code={toolbarTitleCode} />
        <PropTypeDescription header="### PropTypes ToolbarGroup" code={toolbarGroupCode} />
        <PropTypeDescription header="### PropTypes ToolbarItem" code={toolbarItemCode} />
        <PropTypeDescription header="### PropTypes ToolbarSeparator" code={toolbarSeparatorCode} />
    </div>
);
ToolbarPage.meta =  {
    ...pkg,
    title: 'Toolbar',
    keywords: [],
    'see also': [
        'app bar'
    ]
};
export default ToolbarPage;