import React, {Component, PropTypes} from 'react';
import Title from 'react-title-component';
import CodeExample from './CodeExample';
import MarkdownElement from './MarkdownElement';
import PropTypeDescription from './PropTypeDescription';
import StatusBadge from './StatusBadge';
import PlaygroundDrawer from './Playground';

export default class ComponentPage extends Component {
    static propTypes = {
        name: PropTypes.string,
        status: PropTypes.string,
        readme: PropTypes.string,
        examples: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            code: PropTypes.string
        })),
        componentsSources: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            code: PropTypes.string.isRequired
        }))
    };

    static defaultProps = {
        examples: []
    };

    state = {
        code: '',
        isOpen: false
    };

    render() {
        const {name, status, readme, examples, componentsSources} = this.props;
        const {isOpen} = this.state;

        return (
            <div>
                <PlaygroundDrawer ref="playground" open={isOpen} docked={true}
                                  onRequestChange={() => this.setState({isOpen: false})} />
                <div>
                    <Title render={(previousTitle) => `${name} - ${previousTitle}`} />
                    <StatusBadge status={status} />
                    <h1>{name}</h1>
                    <MarkdownElement text={readme} />
                    <h2>Examples</h2>
                    {examples.map((example, index) => {
                        const ExampleComponent = example.component;
                        return (
                            <CodeExample
                                title={example.title}
                                description={example.description}
                                code={example.code}
                                openInPlayground={this.openPlayground}
                                key={index}>
                                <ExampleComponent />
                            </CodeExample>
                        );
                    })}
                    <h2>PropTypes</h2>
                    {componentsSources.map((componentCode, index) => (
                        <PropTypeDescription header={`### ${componentCode.name}`} code={componentCode.code}
                                             key={index} />
                    ))}
                </div>
            </div>
        );
    }

    openPlayground = (code) => {
        this.setState({isOpen: true});
        this.refs.playground.loadCode(code);
    }
}