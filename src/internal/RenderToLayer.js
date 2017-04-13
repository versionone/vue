import {Component, PropTypes} from 'react';
// eslint-disable-next-line camelcase
import {unmountComponentAtNode, unstable_renderSubtreeIntoContainer} from 'react-dom';
import {isDescendant} from './../utilities/dom';
import ThemeProvider from './../ThemeProvider';

const immediateTimeOutValue = 0;

class RenderToLayer extends Component {
    static propTypes = {
        onComponentClickAway: PropTypes.func,
        onRendered: PropTypes.func,
        open: PropTypes.bool.isRequired,
        render: PropTypes.func.isRequired,
    };
    static defaultProps = {
        onComponentClickAway: () => {
        },
    };
    static contextTypes = {
        store: PropTypes.object,
        theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
    };

    constructor(...rest) {
        super(...rest);
        this.getLayer = this.getLayer.bind(this);
        this.createLayer = this.createLayer.bind(this);
        this.renderLayer = this.renderLayer.bind(this);
        this.unrenderLayer = this.unrenderLayer.bind(this);
        this.handleClickAway = this.handleClickAway.bind(this);
    }

    componentDidMount() {
        this.renderLayer();
    }

    componentDidUpdate() {
        this.renderLayer();
    }

    componentWillUnmount() {
        this.unrenderLayer();
    }

    getLayer() {
        return this.layer;
    }

    createLayer() {
        if (this.layer) {
            return this.layer;
        }
        this.layer = document.createElement('div');
        document.body.appendChild(this.layer);
        return this.layer;
    }

    renderLayer() {
        const {
            open,
            render,
            onRendered,
        } = this.props;
        if (!open) {
            this.unrenderLayer();
            return;
        }

        const layer = this.createLayer();
        setTimeout(() => {
            addEventListener('click', this.handleClickAway);
        }, immediateTimeOutValue);

        this.layerElement = unstable_renderSubtreeIntoContainer(this, render(), layer, onRendered);
    }

    unrenderLayer() {
        if (!this.layer) {
            return;
        }
        removeEventListener('click', this.handleClickAway);
        unmountComponentAtNode(this.layer);
        document.body.removeChild(this.layer);
        this.layer = null;
    }

    handleClickAway(evt) {
        const {
            open, onComponentClickAway,
        } = this.props;
        if (evt.defaultPrevented || !open) {
            return;
        }
        const el = this.layer;
        const handlingClickAway = (
            evt.target !== el
            && (
                evt.target === window
                || (document.documentElement.contains(evt.target) && !isDescendant(el, evt.target))
            )
        );
        if (handlingClickAway) {
            onComponentClickAway(evt);
        }
    }

    // eslint-disable-next-line class-methods-use-this
    render() {
        return null;
    }
}
export default RenderToLayer;
