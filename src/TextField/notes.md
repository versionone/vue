## Behaviors

* has a value
* has no default value
* has informational placeholder text
* allows alpha-numeric character entry
* provides information states
    * when value has been changed
    * when value is required
    * when value is invalid
    * when field is disabled

## Events

* focus
* blur
* on value change (real-time)
    * occurs on keydown of each typed character while field is focused
* on value change
    * occurs once field is no longer in focus

_________________________________
## Text Fields

Two types: Normal and Auto-Predictor

## Normal
(Any Grid, Asset Detail, CommitStream Admin, etc)

States: Static (2 types with & without text), Focus, Disabled (CS), Required

* Static -
  * Bordered text container
  ![Static](/images/components/textfield/text_field_static.png)

* Static with informational text -
  * Bordered text container – lighter color
  * Paragraph text inside container – lighter color – disappears once text is entered
  ![Static with informational text](/images/components/textfield/text_field_static_text.png)

* Focus -
  * Blue border added when user clicks into field. Focus css attribute
  ![Focus](/images/components/textfield/text_field_focus.png)

* Disabled -
  * Action button is disabled and displays grey until requirements have been satisfied.
  ![Disabled](/images/components/textfield/text_field_disabled_b.png)


  * Once satisfied, action button becomes active and changes color.
  ![Active](/images/components/textfield/text_field_disabled_2.png)


* Required -
  * Text Field that is required to continue. Asterisk Icon  
  ![Required](/images/components/textfield/text_field_req.png)


## Auto-Predictor
(Specialized Grid assets (owners, Timesheets, Scheduled On, Customer, Team, Portfolio Item, Strategic Themes)

States: Static, Focus, Changed, No Results

* Static –
  * Appears like the “Normal” text field with bordered text container
  * ![Static](/images/components/textfield/text_field_static.png)

* Focus –
  * When user clicks into field, drop down appears with options. Border remains the same (Team, Strategic themes, Owners)
  ![Focus](/images/components/textfield/text_field_predictive_focus.png)


  * Epics & Portfolio Items
    * Blue border added when user clicks into field and drop down appears after user has typed in 3 characters
    ![Focus](/images/components/textfield/text_field_predictive_list.png)

  * Scheduled On Items 
    * A month calendar appears showing the current date
    ![Focus](/images/components/textfield/text_field_predictive_date.png)


* Accepted/Changed –
  * Teams - Text field background changes to yellow. Suggestions appear
  ![Teams](/images/components/textfield/text_field_predictive_a.png)


  * Owners - Text field background changes to blue. Suggestions appear
  ![Owners](/images/components/textfield/text_field_predictive_changed.png)


* No Results -
  * When no results are found, drop down with orange fill appears
  ![No Results](/images/components/textfield/text_field_noresults.png)
