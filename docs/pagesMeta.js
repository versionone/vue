import {index} from './src/app/searchIndex';
import camelCase from 'camelcase';
import pages from './pages';

pages.forEach((page) => index(`page/${camelCase(page.title)}`, page));

export default pages;