import { InParser } from '../InParser';

describe('InParser', () => {
    let parser: InParser;
    
    beforeEach(() => {
        parser = new InParser();
    });
    
    describe('channel member list parsing', () => {
        it('should parse player names from channel member list', () => {
            const message = `Channel 39 "Politics": atlasNTST blikII(TD) BOTCHvinik cday chanbot(U) chLog(TD) Drad GuestJGLH(U) GuestMCDK(U) jones 
\\   {mcstorytaller} {Mucke} patriotscout Plebusan plk skumbumuk {WOJowhiSKeY}
17 players are in channel 39.
fics% `;
            
            const result = parser.parse(message);
            
            expect(result).not.toBeNull();
            expect(result!.elements).toContainEqual(
                expect.objectContaining({
                    type: 'player',
                    text: 'atlasNTST',
                    action: 'finger atlasNTST'
                })
            );
            expect(result!.elements).toContainEqual(
                expect.objectContaining({
                    type: 'player',
                    text: 'blikII(TD)',
                    action: 'finger blikII'
                })
            );
            expect(result!.elements).toContainEqual(
                expect.objectContaining({
                    type: 'player',
                    text: '{mcstorytaller}',
                    action: 'finger mcstorytaller'
                })
            );
            expect(result!.elements).toContainEqual(
                expect.objectContaining({
                    type: 'player',
                    text: '{WOJowhiSKeY}',
                    action: 'finger WOJowhiSKeY'
                })
            );
            
            // Ensure "Politics" is NOT parsed as a player
            expect(result!.elements).not.toContainEqual(
                expect.objectContaining({
                    type: 'player',
                    text: 'Politics'
                })
            );
        });
        
        it('should still parse regular "is active" format', () => {
            const message = `cday is active (idle for 0 seconds).
fics% `;
            
            const result = parser.parse(message);
            
            expect(result).not.toBeNull();
            expect(result!.elements).toContainEqual(
                expect.objectContaining({
                    type: 'player',
                    text: 'cday',
                    action: 'finger cday'
                })
            );
        });
    });
});