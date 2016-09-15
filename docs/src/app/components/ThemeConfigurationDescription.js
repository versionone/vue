import React, {Component, PropTypes} from 'react';
import {parse} from 'react-docgen';
import resolver from 'react-docgen/dist/resolver/findExportedComponentDefinition';
import {parse as parseDoctrine} from 'doctrine';
import MarkdownElement from './MarkdownElement';
import recast from 'recast';
import themePropHandler from './../themePropHandler';
import themePropsDefaultHandler from './../themePropsDefaultHandler';
import themePropDocblockHandler from './../themePropDocblockHandler';
import themeStatesHandler from './../themeStatesHandler';

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
    switch (type.name) {
        case 'func':
            return 'function';

        case 'custom':
            const deprecatedInfo = getDeprecatedInfo(type);

            if (deprecatedInfo !== false) {
                return generatePropType({
                    name: deprecatedInfo.propTypes
                });
            }

            return type.raw;

        case 'enum':
            const values = type.value.map((v) => v.value).join('<br>&nbsp;');
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

    if (parsed.tags.some((tag) => tag.title === 'ignore')) return null;
    let signature = '';

    if (type.name === 'func' && parsed.tags.length > 0) {
        // Remove new lines from tag descriptions to avoid markdown errors.
        parsed.tags.forEach((tag) => {
            if (tag.description) {
                tag.description = tag.description.replace(/\n/g, ' ');
            }
        });

        // Split up the parsed tags into 'arguments' and 'returns' parsed objects. If there's no
        // 'returns' parsed object (i.e., one with title being 'returns'), make one of type 'void'.
        const parsedLength = parsed.tags.length;
        let parsedArgs = [];
        let parsedReturns;

        if (parsed.tags[parsedLength - 1].title === 'returns') {
            parsedArgs = parsed.tags.slice(0, parsedLength - 1);
            parsedReturns = parsed.tags[parsedLength - 1];
        } else {
            parsedArgs = parsed.tags;
            parsedReturns = {type: {name: 'void'}};
        }

        signature += '<br><br>**Signature:**<br>`function(';
        signature += parsedArgs.map((tag) => `${tag.name}: ${tag.type.name}`).join(', ');
        signature += `) => ${parsedReturns.type.name}` + '`<br>';
        signature += parsedArgs.map((tag) => `*${tag.name}:* ${tag.description}`).join('<br>');
        if (parsedReturns.description) {
            signature += `<br> *returns* (${parsedReturns.type.name}): ${parsedReturns.description}`;
        }
    }

    return `${deprecated} ${jsDocText}${signature}`;
}

class ThemeConfigurationDescription extends Component {

    static propTypes = {
        code: PropTypes.string,
        header: PropTypes.string.isRequired
    };

    static defaultProps = {
        header: '### Properties'
    };

    render() {
        const {
            code,
            header
        } = this.props;

        const componentInfo = parse(code, resolver, [themePropHandler, themePropsDefaultHandler, themePropDocblockHandler, themeStatesHandler]);

        const text = `${header}
${this.getThemeStatesText(componentInfo)}
${this.getThemePropsText(componentInfo)}`;

        const requiredProps = Object.keys(componentInfo.props).reduce((output, key) => output + componentInfo.props[key].required ? 1 : 0, 0);
        const requiredPropFootnote = (requiredProps === 1) ? '* required property' :
            (requiredProps > 1) ? '* required properties' :
                '';

        return (
            <div className="propTypeDescription">
                <MarkdownElement text={text} />
                <div style={{fontSize: '90%', paddingLeft: '15px'}}>{requiredPropFootnote}</div>
            </div>
        );
    }

    getThemeStatesText = (componentInfo) => `#### States
| Name | Description |
|:-----|:-----|
${componentInfo.themedStates.map((state) => {
        const description = '';
        return `| ${state} | ${description} |`;
    })
        .join('\n')}
`;

    getThemePropsText = (componentInfo) => `#### Theme Properties
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
${Object.keys(componentInfo.props).map((key) => {
        const prop = componentInfo.props[key];
        const description = generateDescription(prop.required, prop.description, prop.type);

        if (description === null) return;

        let defaultValue = '';

        if (prop.defaultValue) {
            defaultValue = prop.defaultValue.value.replace(/\n/g, '');
        }

        if (prop.required) {
            key = `<span style="color: #31a148">${key} \*</span>`;
        }

        if (prop.type.name === 'custom') {
            if (getDeprecatedInfo(prop.type)) {
                key = `~~${key}~~`;
            }
        }
        return `| ${key} | ${generatePropType(prop.type)} | ${defaultValue} | ${description} |`;
    })
        .join('\n')}
`;
}

export default ThemeConfigurationDescription;
