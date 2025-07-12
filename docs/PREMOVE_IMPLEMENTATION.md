# Premove Implementation

## Overview
Premove functionality has been implemented for the FICS interface. This allows players to pre-select their next move during their opponent's turn, which is automatically executed when it becomes their turn.

## Features
- **Premove in Playing Mode Only**: Premoves can only be set when playing a game (not when observing or examining)
- **Opponent's Turn Only**: Premoves can only be set during the opponent's turn
- **Visual Feedback**: The premove is displayed in the "Last move" area as "Premove: e2e4"
- **Right-Click to Cancel**: Right-clicking anywhere on the board clears the premove
- **Automatic Execution**: When it becomes the player's turn, the premove is automatically sent to FICS
- **Promotion Support**: Premoves support pawn promotion using the auto-promotion preference

## Technical Implementation

### GameStore Changes
- Added `premove` state to store the premove details
- Added `setPremove()` method to set a premove (only when playing and not my turn)
- Added `clearPremove()` method to clear the current premove
- Added `executePremove()` method to send the premove to FICS
- Modified `updateFromStyle12()` to check and execute premoves when turn changes

### ChessBoardWithPieces Changes
- Modified click and drag handlers to set premoves when it's not the player's turn
- Added right-click handler to clear premoves
- Board remains interactive during opponent's turn in playing mode

### UI Changes
- Updated the "Last move" display to show "Premove: [move]" when a premove is set
- Works in both portrait and landscape orientations

## Usage
1. During your opponent's turn, click or drag a piece to make a move
2. The move will be recorded as a premove and displayed as "Premove: e2e4"
3. The board will return to the current position (the move is not shown on the board)
4. When it becomes your turn, the premove is automatically executed
5. Right-click anywhere on the board to cancel the premove

## Notes
- Premoves are not validated until execution (following standard FICS behavior)
- If a premove becomes illegal due to the opponent's move, it will be rejected by FICS
- The board position does not update when setting a premove - only the label changes