import React from 'react';
import {StockfishTest} from '../components/StockfishTest';

/**
 * Dedicated test page for Stockfish engine debugging and testing
 * This page provides a standalone interface for testing chess engine functionality
 */
export const StockfishTestPage: React.FC = () => {
    return (
        <div style={{
            minHeight: '100vh',
            background: '#f5f5f5',
            padding: '20px'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <h1 style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    color: '#333'
                }}>
                    Stockfish Engine Test Page
                </h1>
                
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    padding: '20px'
                }}>
                    <StockfishTest />
                </div>
                
                <div style={{
                    marginTop: '20px',
                    padding: '20px',
                    background: '#e8f4f8',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#555'
                }}>
                    <h3>About This Test Page</h3>
                    <p>
                        This is a dedicated test page for the Stockfish chess engine integration.
                        It provides debugging tools and a simple interface to test engine functionality.
                    </p>
                    <ul>
                        <li>Check engine initialization status</li>
                        <li>Test position analysis with custom FEN strings</li>
                        <li>View real-time analysis output</li>
                        <li>Debug engine communication issues</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StockfishTestPage;