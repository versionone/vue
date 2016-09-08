import {index} from './src/app/searchIndex';
import camelCase from 'camelcase';
import pages from './pages';
import extractPageMeta from './src/app/page';

const pagesMeta = pages.map((page) => typeof page !== 'string' ? page : extractPageMeta(page));
pagesMeta.forEach((page) => index(`page/${camelCase(page.title)}`, page));

export default pagesMeta;