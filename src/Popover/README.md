A popover is a [visually un-styled](/#unstyled)<sup>[1](/#unstyled)</sup> panel that can render above other items on the page. The location in which it renders is based relative to a anchor element. Positioning is based on a provided origin point on both the anchor element and the target `Popover`.

Positioning can be set for both horizontal and vertical with `Position` keywords; `top`, `middle`, `bottom` for vertical and `left`, `center`, and `right` for horizontal.

Popovers will attempt to "nudge" themselves left/right or top/down, but not both, in order to fit within the viewport. However, this behavior is disabled if nudging would place the popover on top of its anchor.

---

<sup id="unstyled">
Popovers are intended to be used within other components. Its only concerned is with its positioning; one which will be directly adjacent to the anchor (no spacing). In order to use something like a tooltip, then a `Tooltip` component could the popover internally.
</sup>
