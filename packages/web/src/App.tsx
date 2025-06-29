import React from 'react';
import {RootStoreProvider} from '@fics/shared';
import {ThemeProvider} from './theme';
import {LayoutProvider} from './components/layout';
import {MainLayout} from './components/MainLayout';
import {GlobalStyles} from './components/GlobalStyles';

const App: React.FC = () => {
    return (
        <RootStoreProvider>
            <ThemeProvider>
                <GlobalStyles/>
                <LayoutProvider>
                    <MainLayout/>
                </LayoutProvider>
            </ThemeProvider>
        </RootStoreProvider>
    );
};

export default App;