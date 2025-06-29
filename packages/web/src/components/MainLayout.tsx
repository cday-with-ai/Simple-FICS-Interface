import React from 'react';
import {useLayoutContext} from './layout';
import {LandscapeLayout, PortraitLayout} from './layout';
import {ThemeToggle} from './ui/ThemeToggle';
import {LayoutToggle} from './ui/LayoutToggle';
import {DigitalClock, GameClock} from './ui/DigitalClock';
import {DigitalScore, EvaluationBar} from './ui/DigitalScore';
import {StockfishTest} from './StockfishTest';

export const MainLayout: React.FC = () => {
    const {activeLayout, layoutPreference, isCompactMode} = useLayoutContext();

    // Common header content
    const headerContent = (
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <div style={{flex: 1}}>
                Simple FICS Interface - {activeLayout} mode
                {layoutPreference !== 'auto' && ' (forced)'}
            </div>

            {/* Demo game clocks with digital font */}
            <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                <div style={{fontSize: '12px', color: 'var(--color-textSecondary)'}}>White(1600):</div>
                <GameClock time={900} isActive={true}/>
                <div style={{fontSize: '12px', color: 'var(--color-textSecondary)'}}>Black(1600):</div>
                <GameClock time={847}/>
            </div>

            <LayoutToggle/>
            <ThemeToggle/>
        </div>
    );

    // Common chess board placeholder
    const chessBoardContent = (
        <div style={{
            width: isCompactMode ? '100%' : '400px',
            height: isCompactMode ? '100%' : '400px',
            maxWidth: '400px',
            maxHeight: '400px',
            aspectRatio: '1',
            background: 'var(--color-chessBoardLight)',
            border: '2px solid #8b4513',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#8b4513',
        }}>
            Chess Board
            <br/>
            <small>({activeLayout} layout)</small>
        </div>
    );

    // Common panel content
    const panelContent = (
        <div style={{padding: '1rem'}}>
            <h3>Panel Content</h3>
            <p>This is a placeholder for the chat, moves, and analysis panels.</p>
            <p>Layout: {activeLayout}</p>
            <p>Compact mode: {isCompactMode ? 'Yes' : 'No'}</p>
            <p>Preference: {layoutPreference}</p>

            {/* Stockfish Integration Test */}
            <StockfishTest/>

            <div style={{marginTop: '1rem'}}>
                <h4>Sample Chat Messages:</h4>
                <div style={{
                    background: 'var(--color-backgroundTertiary)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    marginTop: '0.5rem',
                    fontSize: '14px'
                }}>
                    <div><strong>Player1:</strong> Good luck!</div>
                    <div><strong>Player2:</strong> You too!</div>
                    <div style={{color: 'var(--color-textSecondary)'}}>
                        <em>System: Game started</em>
                    </div>
                </div>
            </div>

            <div style={{marginTop: '1rem'}}>
                <h4>Move History:</h4>
                <div style={{
                    background: 'var(--color-backgroundTertiary)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    marginTop: '0.5rem',
                    fontSize: '14px',
                    fontFamily: 'monospace'
                }}>
                    1. e4 e5<br/>
                    2. Nf3 Nc6<br/>
                    3. Bb5 a6
                </div>
            </div>

            <div style={{marginTop: '1rem'}}>
                <h4>Digital Font Examples:</h4>
                <div style={{
                    background: 'var(--color-backgroundTertiary)',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    marginTop: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}>
                    <div>
                        <strong>Clock Examples:</strong>
                        <div style={{display: 'flex', gap: '1rem', margin: '0.5rem 0'}}>
                            <DigitalClock time={900} size="small"/>
                            <DigitalClock time={63} size="medium" lowTimeThreshold={30} showTenths={true}/>
                            <DigitalClock time={25} size="large" lowTimeThreshold={30}/>
                        </div>
                    </div>

                    <div>
                        <strong>Evaluation Examples:</strong>
                        <div style={{display: 'flex', gap: '1rem', margin: '0.5rem 0', alignItems: 'center'}}>
                            <DigitalScore score={75} format="centipawns"/>
                            <DigitalScore score={-150} format="centipawns"/>
                            <DigitalScore score={0} format="centipawns"/>
                        </div>
                    </div>

                    <div>
                        <strong>Evaluation Bar:</strong>
                        <div style={{margin: '0.5rem 0'}}>
                            <EvaluationBar score={120}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Render the appropriate layout based on active layout mode
    if (activeLayout === 'portrait' || isCompactMode) {
        return (
            <PortraitLayout
                headerSlot={headerContent}
                chessBoardSlot={chessBoardContent}
                panelContent={panelContent}
                availableTabs={['chat', 'moves', 'analysis']}
            />
        );
    } else {
        return (
            <LandscapeLayout
                topBarSlot={headerContent}
                chessBoardSlot={chessBoardContent}
                sidebarContent={panelContent}
                availableTabs={['chat', 'moves', 'analysis']}
            />
        );
    }
};