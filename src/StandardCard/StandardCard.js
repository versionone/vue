import React, {Component, PropTypes} from 'react';

export default class StandardCard extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        headerStyle: PropTypes.object,
        contentStyle: PropTypes.object
    };

    static defaultProps = {
        title: null,
        className: '',
        style: {},
        headerStyle: {},
        contentStyle: {}
    };

    render() {
        const { children, title, className, style, headerStyle, contentStyle } = this.props;

        const standardCardStyle = Object.assign({}, StandardCard.defaultStyles.card, style);
        const standardCardHeaderStyle = Object.assign({}, StandardCard.defaultStyles.header, headerStyle);
        const standardCardContentStyle = Object.assign({}, StandardCard.defaultStyles.content, contentStyle);

        return (
            <div className={`standard-card ${className}`} style={standardCardStyle}>
                <div className="standard-card-header" style={standardCardHeaderStyle}>
                    {title}
                </div>
                <div className="standard-card-content" style={standardCardContentStyle}>
                    {children}
                </div>
            </div>
        )
    }

    static defaultStyles = {
        card: {
            backgroundColor: '#dde2e9',
            borderBottom: '1px solid #b7bcc4',
            display: 'flex',
            flexWrap: 'wrap',
            marginBottom: '.7rem'
        },
        header: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            padding: '0 .5rem',
            lineHeight: '42px',
            fontWeight: '400',
            fontStyle: 'normal',
            fontSize: '1.714em',
            letterSpacing: '-0.025em',
            width: '100%',
            minHeight: '42px',
            margin: 0,
            flex: '1 auto'
        },
        content: {
            width: '100%',
            backgroundColor: 'white',
            flex: '1 auto',
            minHeight: '300px'
        }
    };
}