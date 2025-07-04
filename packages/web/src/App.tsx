import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {RootStoreProvider} from '@fics/shared';
import {ThemeProvider} from './theme';
import {LayoutProvider} from './components/layout';
import {MainLayout} from './components/MainLayout';
import {GlobalStyles} from './components/GlobalStyles';
import {StockfishTestPage} from './pages/StockfishTestPage';

const App: React.FC = () => {
    return (
        <RootStoreProvider>
            <ThemeProvider>
                <GlobalStyles/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={
                            <LayoutProvider>
                                <MainLayout/>
                            </LayoutProvider>
                        }/>
                        <Route path="/stockfish-test" element={<StockfishTestPage/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </RootStoreProvider>
    );
};

export default App;