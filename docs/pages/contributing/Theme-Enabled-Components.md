---
title: Theme Enabled Components
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

This guide will provide all the details necessary to theme a component. This includes how to create a theme-enabled component. If you want to know more about why themes were chosen over stylesheets, see the [Theme](/#/page/Theme) page.

## What is a Theme
A theme is a flat set of semantic configuration options to be shared and applied across multiple components to provide consistency throughout all components with the same theme. As such, theme properties should provide semantic value with what the theme property means or represents. As an example, the theme properties `yellow` and `yellowAccent` have no meaning. Instead, a better set of properties would be `warningPrimaryColor` and `warningSecondaryColor`.

## Where is the default VersionOne Theme
`./src/styles/themes/V1Theme/index.js`

## Theme Enabled Components
Every component should define a `contextTypes` static class property. The `contextTypes` should contain a theme with all the required theme properties that this component requires. Listing the specific properties from the theme that the component requires, will help identify new or missing theme properties.

A common approach is to use a getStyles function to consolidate application of styles (conditional based of props, 
state, etc.).

```js
const TestComponent = (props, context) => {
    const getStyles = () => {
        const {isError} = props;
        const {theme} = context;
        
        return {
            heading: {
                color: isError ? theme.errorPrimaryColor : 'black'
            },
            root: {
                backgroundColor: isError ? theme.errorSecondaryColor : 'white'
            },
        };
    };
    
    const styles = getStyles();
    return (
        <div style={styles.root}>
            <h1 style={styles.heading}>and so on</h1>
        </div>
    );
};
TestComponent.contextTypes = {
  theme: PropTypes.shape({
    errorPrimaryColor: PropTypes.string.isRequired,
    errorSecondaryColor: PropTypes.string.isRequired,
  }),
};
```
