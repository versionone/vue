import ThemeProvider from './ThemeProvider';
import * as zindex from './zIndex';

export default ThemeProvider;
export const zIndex = zindex;
export {default as getTheme} from './getTheme';
export {default as connectToWindow} from './connectToWindow';