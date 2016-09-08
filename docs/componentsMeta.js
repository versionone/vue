import {index} from './src/app/searchIndex';
import * as meta from 'vue/_meta';

Object.keys(meta).forEach((key) => index(`component/${key}`, meta[key]));

export default meta;