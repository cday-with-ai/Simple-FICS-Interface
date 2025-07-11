import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {RootStoreProvider} from '@fics/shared';
import {ThemeProvider} from './theme';
import {LayoutProvider} from './components/layout';
import {AppLayout} from './components/layout/AppLayout';
import {GlobalStyles} from './components/GlobalStyles';

const App: React.FC = () => {
    return (
        <RootStoreProvider>
            <ThemeProvider>
                <GlobalStyles/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={
                            <LayoutProvider>
                                <AppLayout/>
                            </LayoutProvider>
                        }/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </RootStoreProvider>
    );
};

export default App;