import React, {Component, PropTypes} from 'react';
import resolver from 'react-docgen/dist/resolver/findAllComponentDefinitions';
import recast from 'recast';
import {parse} from 'react-docgen';
import {parse as parseDoctrine} from 'doctrine';
import MarkdownElement from './MarkdownElement';
import ThemeProvider from './../../../../src/ThemeProvider';
import themeDefinitionPropHandler from './../themePropHandler';
import themePropDocblockHandler from './../themePropDocblockHandler';

require('./prop-type-description.css');

function getDeprecatedInfo(type) {
    const deprecatedPropType = 'deprecated(PropTypes.';

    const indexStart = type.raw.indexOf(deprecatedPropType);

    if (indexStart !== -1) {
        return {
            propTypes: type.raw.substring(indexStart + deprecatedPropType.length, type.raw.indexOf(',')),
            explanation: recast.parse(type.raw).program.body[0].expression.arguments[1].value
        };
    }

    return false;
}

function generatePropType(type) {
    let deprecatedInfo;
    let values;
    switch (type.name) {
        case 'func':
            return 'function';
        case 'custom':
            deprecatedInfo = getDeprecatedInfo(type);
            if (deprecatedInfo !== false) {
                return generatePropType({name: deprecatedInfo.propTypes});
            }
            return type.raw;
        case 'enum':
            values = type.value
                .map(v => v.value)
                .join('<br>&nbsp;');
            return `enum:<br>&nbsp;${values}<br>`;
        default:
            return type.name;
    }
}

function generateDescription(required, description, type) {
    let deprecated = '';

    if (type.name === 'custom') {
        const deprecatedInfo = getDeprecatedInfo(type);

        if (deprecatedInfo) {
            deprecated = `*Deprecated*. ${deprecatedInfo.explanation}<br><br>`;
        }
    }

    const parsed = parseDoctrine(description);

    // two new lines result in a newline in the table. all other new lines
    // must be eliminated to prevent markdown mayhem.
    const jsDocText = parsed.description.replace(/\n\n/g, '<br>').replace(/\n/g, ' ');

    if (parsed.tags.some(tag => tag.title === 'ignore')) {
        return null;
    }
    let signature = '';

    if (type.name === 'func' && parsed.tags.length > 0) {
        // Remove new lines from tag descriptions to avoid markdown errors.
        parsed.tags = parsed.tags.map((tag) => {
            if (tag.description) {
                return {
                    ...tag,
                    description: tag.description.replace(/\n/g, ' ')
                };
            }
            return tag;
        });

        // Split up the parsed tags into 'arguments' and 'returns' parsed objects. If there's no
        // 'returns' parsed object (i.e., one with title being 'returns'), make one of type 'void'.
        const parsedLength = parsed.tags.length;
        let parsedArgs = [];
        let parsedReturns;

        if (parsed.tags[parsedLength - 1].title === 'returns') {
            parsedArgs = parsed.tags.slice(0, parsedLength - 1);
            parsedReturns = parsed.tags[parsedLength - 1];
        }
        else {
            parsedArgs = parsed.tags;
            parsedReturns = {type: {name: 'void'}};
        }

        signature += '<br><br>**Signature:**<br>`function(';
        signature += parsedArgs.map(tag => `${tag.name}: ${tag.type.name}`).join(', ');
        signature += `) => ${parsedReturns.type.name}<br/>`;
        signature += parsedArgs.map(tag => `*${tag.name}:* ${tag.description}`).join('<br>');
        if (parsedReturns.description) {
            signature += `<br> *returns* (${parsedReturns.type.name}): ${parsedReturns.description}`;
        }
    }

    return `${deprecated} ${jsDocText}${signature}`;
}

const getThemeTable = propsMap => (theme) => {
    const tableBody = Object.keys(propsMap)
        .filter(key => propsMap[key].type)
        .map((key) => {
            const prop = propsMap[key];
            const description = generateDescription(false, prop.description, prop.type);

            if (description === null) {
                return '';
            }
            let keyName = key;
            if (prop.type.name === 'custom') {
                if (getDeprecatedInfo(prop.type)) {
                    keyName = `~~${key}~~`;
                }
            }
            return `| ${keyName} | ${generatePropType(prop.type)} | ${theme[key]} | ${description} |`;
        })
        .join('\n');
    return `#### ${theme._name}
| Name | Type | Value | Description |
|:-----|:-----|:------|:------------|
${tableBody}
`;
};

class ThemeConfigurationDescription extends Component {
    static propTypes = {
        code: PropTypes.string.isRequired,
        themes: PropTypes.arrayOf(PropTypes.shape(ThemeProvider.themeDefinition).isRequired)
    };
    static defaultProps = {themes: []};

    render() {
        const {
            code,
            themes
        } = this.props;
        const parseHandlers = [
            themeDefinitionPropHandler,
            themePropDocblockHandler
        ];
        const componentInfo = parse(code, resolver, parseHandlers)[0];
        const themePropMap = componentInfo.props;
        const getThemePropTable = getThemeTable(themePropMap);

        return (
            <div className="propTypeDescription">
                <div>
                    <MarkdownElement text="## Themes" />
                    {themes.map((theme, themeIndex) => (
                        <MarkdownElement
                            key={themeIndex}
                            text={getThemePropTable(theme)}
                        />
                    ))}
                    <div
                        style={{
                            fontSize: '90%',
                            paddingLeft: '15px'
                        }}
                    ><strong>all theme properties are required</strong>
                    </div>
                </div>
            </div>
        );
    }
}

export default ThemeConfigurationDescription;
