Popovers are containers for supporting content that are displayed on user request. If complex interactions are needed consider using 'xxxxx' as an alternative.

### Behaviors

* Trigger Open - Display on 'clicking' on UI component, note: not hover activated.
* Notch - The notch position should be at the top of the popover and centered on UI component where possible. Direction of notch should point North.
* Actions - Popovers should have two actions or less. The main action should be to consume the information inside the popover and close. Alternatively the user may want to select a 'secondary button' or a 'link button' if needed.
* Trigger Close - Automatic close by 'clicking' outside the popover or 'clicking' on 'close button'.

### Variations
* 'Tooltip'
* 'Advanced Dialogs'

## Note

The `event.preventDefault();` in the examples above is to prevent an effect called [ghost click](http://ariatemplates.com/blog/2014/05/ghost-clicks-in-mobile-browsers/) that happens with touch-devices. It is recommended that you add that call whenever you handle a `TouchTap` event associated with closing/opening `Popover`.