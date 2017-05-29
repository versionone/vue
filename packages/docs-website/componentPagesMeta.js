import {index} from './src/app/searchIndex';
import * as meta from '@versionone/ui/_meta';

Object.keys(meta).forEach((key) => index(`component/${key}`, meta[key]));

export default meta;
