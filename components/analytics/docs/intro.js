import { code, md } from '@versionone/ui-docs';

export default () => md`
Analytics events are supported by all relevant VersionOne UI components; however any component can fire these events. See [using analytics with Custom Components](./docs/custom-components) for more details on supporting analytics events in your own, custom components.

## Using Analytics with VersionOne UI Components

All VersionOne UI components support analytics events. Event handlers for VersionOne UI components provide an analytics event as the second parameter. For example, given an Asset form containing a SaveButton:

#### SaveButton.js

${code`
import Button from '@versionone/ui-button';

const SaveButton = ({ onClick }) => (
  <Button onClick={onClick}>Save</Button>
);
`}

Button is a VersionOne UI component and therefore provides its event handlers with an analytics event as a second parameter:

#### SaveButton.js

${code`
import Button from '@versionone/ui-button';

const SaveButton = ({ onClick }) => (
  <Button onClick={(evt, analyticsEvt) => {
    analyticsEvt.fire(); // Fire analytics event; can optionally provide a channel string parameter.
    if (onClick) {
      onClick(evt);
    }
  }}>
    Save
  </Button>
);
`}

You can also update the analytics event with additional payload information. Remember, you can only update an analytics event before it has fired.

#### SaveButton.js

${code`
import Button from '@versionone/ui-button';

const SaveButton = ({ onClick }) => (
  <Button onClick={(evt, analyticsEvt) => {
    analyticsEvt.update({ // Update with an object literal
      action: 'save',
    });
    analyticsEvt.update(payload => ({ // Update with a callback
      ...payload,
      additionalAction: payload.action === 'save' ? 'save workitem' : null,
    }));

    analyticsEvt.fire(); // Fire analytics event; can optionally provide a channel string parameter.

    if (onClick) {
      onClick(evt);
    }
  }}>
    Save
  </Button>
);
`}

Finally, we need to set up a listener to consume fired analytics events. This can be accomplished with the \`AnalyticsListener\` component.

#### App.js

${code`
import { AnalyticsListener } from '@versionone/ui-analytics';
import SaveButton from './SaveButton';

const consumeAnalytics = analyticsEvt => console.log(analyticsEvt);

const App = () => (
  <AnalyticsListener onEvent={consumeAnalytics}>
    <SaveButton />
  </AnalyticsListener>
);
`}

The \`AnalyticsListener\`'s \`onEvent\` callback will be invoked for every fired analytics event. This is where you can capture analytics events and send them to Google Analytics or some other back-end service.

Additionally, we can provide additional contextual data to our analytics event via the \'AnalyticsContext\` component.

#### App.js

${code`
import { AnalyticsContext, AnalyticsListener } from '@versionone/ui-analytics';
import SaveButton from './SaveButton';

const consumeAnalytics = analyticsEvt => console.log(analyticsEvt);

const App = () => (
  <AnalyticsListener onEvent={consumeAnalytics}>
  <AnalyticsContext data={{ oidToken: 'Story:1234' }}>
      <SaveButton />
    </AnalyticsContext>
  </AnalyticsListener>
);
`}
`;
