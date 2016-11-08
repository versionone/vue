---
title: Theming Components
menuCategory: Contributing
status: stable
keywords:
  - style
  - css
  - less
  - scss
  - sass
  - visual
  - guide
  - stylesheet
  ---

This guide will provide all the details necessary to theme a component. This includes how to create a theme-enabled component, as well as the general process in which theming occurs.

## What is a Theme? <a name="what-is-a-theme"></a>
A theme is a set of semantic configuration options to be shared and applied across multiple components to provide consistency throughout all components with the same theme. As such, theme properties should provide semantic value with what the theme property means or represents. As an example, the theme properties `yellow` and `yellowAccent` have no meaning. Instead, a better set of properties would be `warningPrimaryColor` and `warningSecondaryColor`.

## Enable Theming Components <a name="enable-theming-components"></a>
Every component should define a `contextTypes` static class property. The `contextTypes` should contain a theme with all the required theme properties that this component requires. Listing the specific properties from the theme that the component requires, will help identify new or missing theme properties.

```js
class TestComponent extends React.Component {
    static contextTypes = {
        theme: PropTypes.shape({
            color: PropTypes.shape({
                errorPrimary: PropTypes.string,
                errorSecondary: PropTypes.string
            })
        })
    };
    
    render() {
        const styles = this.getStyles();
        return (
            <div style={styles.root}>
                <h1 style={styles.heading}>and so on</h1>
            </div>
        );
    }
    
    getStyles = () => {
        const {isError} = this.props;
        const {theme} = this.props;
        return {
            heading: {
                color: isError ? theme.color.errorPrimary : 'black'
            },
            root: {
                backgroundColor: isError ? theme.color.errorSecondary : 'white'
            }
        };
    };
}
```