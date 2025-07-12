import 'styled-components';
import {Theme} from './theme/themes';

// Extend styled-components DefaultTheme with our custom theme
declare module 'styled-components' {
    export interface DefaultTheme extends Theme {
    }
}