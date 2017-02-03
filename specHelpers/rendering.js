import toJson from 'enzyme-to-json';
import {mount, shallow} from 'enzyme';
import React from 'react';
import theme from './TestTheme';

export const getRender = (Component) => (props = {}, context = {theme}) => shallow(<Component {...props} />, {context});
export const getMount = (Component) => (props = {}, context = {theme}) => mount(<Component {...props} />, {context});
export const snapshot = (renderedComponent) => toJson(renderedComponent);
