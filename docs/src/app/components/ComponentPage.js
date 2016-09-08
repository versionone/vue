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
        isDeprecated: PropTypes.bool,
        readme: PropTypes.string,
        examples: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            code: PropTypes.string
        })),
        componentsSources: PropTypes.arrayOf(PropTypes.string)
    };

    static defaultProps = {
        examples: [],
        isDeprecated: false
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
                    {examples.map((example, index) => (
                        <CodeExample
                            title={example.title}
                            description={example.description}
                            code={example.code}
                            openInPlayground={this.openPlayground}
                            key={index}>
                            <example.component />
                        </CodeExample>
                    ))}
                    {componentsSources.map((code, index) => (
                        <PropTypeDescription header="## PropTypes" code={code} key={index} />
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