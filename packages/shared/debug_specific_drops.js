const { ChessAPI, Variant } = require('./src/services/ChessAPI/ChessAPI');

// Test specific drop moves like R@h5+ and N@f7+
function debugSpecificDrops() {
    console.log('=== Testing specific drop moves: R@h5+ and N@f7+ ===');
    
    // Create a position where we have rooks and knights to drop
    const api = new ChessAPI(Variant.CRAZYHOUSE);
    
    // Set up a position with some captured pieces
    const moves = [
        'e4', 'e5',
        'Nf3', 'Nc6', 
        'Bb5', 'a6',
        'Bxc6', 'dxc6', // Capture knight
        'Nxe5', 'Nxe4', // Mutual captures
        'Qe4', 'Qe7',   // More moves
        'Qxe7+', 'Bxe7' // More captures
    ];
    
    console.log('Setting up position with captured pieces...');
    let moveCount = 0;
    for (const move of moves) {
        const result = api.makeMove(move);
        if (!result) {
            console.log(`Setup failed at move ${moveCount + 1}: "${move}"`);
            break;
        }
        moveCount++;
    }
    
    console.log(`Position after ${moveCount} moves: ${api.getFen()}`);
    
    // Get captured pieces
    const capturedPieces = api.getCapturedPieces(api.getActiveColor());
    console.log(`Captured pieces for ${api.getActiveColor()}: [${capturedPieces.join(', ')}]`);
    
    // Test specific drops
    const testDrops = ['R@h5+', 'N@f7+', 'R@h5', 'N@f7'];
    
    for (const dropMove of testDrops) {
        console.log(`\nTesting drop move: ${dropMove}`);
        
        // Check if it's in legal moves
        const legalMoves = api.getLegalMoves().map(m => m.san);
        const isLegal = legalMoves.includes(dropMove);
        console.log(`Is ${dropMove} in legal moves? ${isLegal}`);
        
        if (!isLegal) {
            // Show available drops of this piece type
            const pieceType = dropMove.charAt(0);
            const availableDrops = legalMoves.filter(m => m.startsWith(pieceType + '@'));
            console.log(`Available ${pieceType} drops: ${availableDrops.slice(0, 10).join(', ')}${availableDrops.length > 10 ? '...' : ''}`);
        }
        
        // Try to make the move
        const result = api.makeMove(dropMove);
        if (result) {
            console.log(`✓ Successfully executed ${dropMove}`);
            // Undo the move by creating a new position
            api.loadFen(api.getFen().split(' ').slice(0, -1).join(' ') + ' ' + (api.getActiveColor() === 'w' ? 'b' : 'w') + ' - - 0 1');
        } else {
            console.log(`✗ Failed to execute ${dropMove}`);
        }
    }
    
    // Now test from a different position where R@h5+ and N@f7+ might be valid
    console.log('\n=== Testing from a different position ===');
    
    const api2 = new ChessAPI(Variant.CRAZYHOUSE);
    
    // Create a more complex position
    const complexMoves = [
        'e4', 'e5', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4', 'Nxd4', 'Qxd4', 'Nf6',
        'Nc3', 'Be7', 'Bg5', 'O-O', 'O-O-O', 'h6', 'Bh4', 'c5', 'Qd2', 'a6'
    ];
    
    for (const move of complexMoves) {
        const result = api2.makeMove(move);
        if (!result) {
            console.log(`Complex setup failed at: "${move}"`);
            break;
        }
    }
    
    console.log(`Complex position: ${api2.getFen()}`);
    
    const capturedPieces2 = api2.getCapturedPieces(api2.getActiveColor());
    console.log(`Captured pieces for ${api2.getActiveColor()}: [${capturedPieces2.join(', ')}]`);
    
    // Test the specific drops again
    for (const dropMove of ['R@h5+', 'N@f7+']) {
        console.log(`\nTesting ${dropMove} in complex position:`);
        
        const legalMoves = api2.getLegalMoves().map(m => m.san);
        const isLegal = legalMoves.includes(dropMove);
        console.log(`Is ${dropMove} in legal moves? ${isLegal}`);
        
        const result = api2.makeMove(dropMove);
        if (result) {
            console.log(`✓ Successfully executed ${dropMove} in complex position`);
        } else {
            console.log(`✗ Failed to execute ${dropMove} in complex position`);
        }
    }
}

debugSpecificDrops();