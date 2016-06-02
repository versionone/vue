import React from 'react';
import {storiesOf} from '@kadira/storybook';
import StandardCard from './StandardCard';

storiesOf('StandardCard', module)
    .add('with title', () => (
        <StandardCard title="Backlog" />
    ))
    .add('with title and content', () => (
        <StandardCard title="Backlog">
            <div> I am the content of the card</div>
        </StandardCard>
    ))