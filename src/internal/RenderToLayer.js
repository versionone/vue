import {Component, PropTypes} from 'react';
import {unstable_renderSubtreeIntoContainer, unmountComponentAtNode} from 'react-dom';

class RenderToLayer extends Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        render: PropTypes.func.isRequired,
        onComponentClickAway: PropTypes.func,
        className: PropTypes.string
    };

    static defaultProps = {
        onComponentClickAway: () => {
        },
        className: ''
    };

    static contextTypes = {
        theme: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.renderLayer();
    }

    componentDidUpdate() {
        this.renderLayer();
    }

    componentWillUnmount() {
        this.unRenderLayer();
    }

    onClickAway = (event) => {
        if (event.defaultPrevented) {
            return;
        }

        if (!this.props.isOpen) {
            return;
        }

        const el = this.layer;
        if (event.target !== el && event.target === window ||
            document.documentElement.contains(event.target) && !isDescendant(el, event.target)) {
            this.props.onComponentClickAway(event);
        }
    };

    getLayer() {
        return this.layer;
    }

    unRenderLayer() {
        if (!this.layer) {
            return;
        }
        window.removeEventListener('click', this.onClickAway);
        unmountComponentAtNode(this.layer);
        document.body.removeChild(this.layer);
        this.layer = null;
    }

    renderLayer() {
        const {
            isOpen,
            render,
            className
        } = this.props;

        if (!isOpen) {
            this.unRenderLayer();
            return;
        }

        if (this.layer) {
            setTimeout(() => {
                window.addEventListener('click', this.onClickAway);
            }, 0);
        } else {
            this.layer = document.createElement('div');
            this.layer.className += ` ${className}`;
            document.body.appendChild(this.layer);
        }

        const layerElement = render();
        this.layerElement = unstable_renderSubtreeIntoContainer(this, layerElement, this.layer);
    }

    render() {
        return null;
    }
}

export default RenderToLayer;

const isDescendant = (child, parent) => {
    let node = child.parentNode;

    while (node !== null) {
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;

};
