A popover is an [unstyled](/#unstyled)<sup>[1](/#unstyled)</sup> panel that can render above other items on the page. The location in which it renders is based relative to a anchor element. If the rendering position of the `Popover` extends beyond the viewport, then its position is automatically adjusted. This ensures the contents of a `Popover` will always be within the viewport. Positioning is based on a provided origin point on both the anchor element and the target `Popover`.

Positioning can be set for both horizontal and vertical with `Position` keywords; `top`, `middle`, `bottom` for vertical and `left`, `center`, and `right` for horizontal.

---

<sup id="unstyled">
`Popover` is intended to be used within other components. Its only concerned is with its positioning; one which will be directly adjacent to the anchor (no spacing). In order to use something like a tooltip, then a `Tooltip` component can use a `Popover` internally.
</sup>
