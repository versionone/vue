import Radium from 'radium';

export default function ConfiguredRadium(component) {
    return Radium({
        plugins: [
            Radium.Plugins.mergeStyleArray,
            Radium.Plugins.checkProps,
            Radium.Plugins.resolveMediaQueries,
            Radium.Plugins.resolveInteractionStyles,
            Radium.Plugins.prefix,
            Radium.Plugins.checkProps,
        ],
    })(component);
}
