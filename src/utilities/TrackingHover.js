import React, { Component, } from 'react';

export default ComponentToTrackHover => class TrackingHover extends Component {
    static propTypes = Component.propTypes;

    constructor(...rest) {
        super(...rest);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

        this.state = { hovered: false, };
    }

    handleMouseEnter() {
        this.setState({ hovered: true, });
    }

    handleMouseLeave() {
        this.setState({ hovered: false, });
    }

    render() {
        const { hovered, } = this.state;

        return (
            <div
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <ComponentToTrackHover
                    {...this.props}
                    hovered={hovered}
                />
            </div>
        );
    }
    };
