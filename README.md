# Simple-FICS-Interface
Try it <a href="https://cday-with-ai.github.io/Simple-FICS-Interface/" target="_blank">here</a>.

A minimalist FICS interface which focuses on easy game play and chat functionality. It should eventually work on mobile and tablet devices.

Currently, under construction. See the Road Map below for the current state.

Functionality (Working functionality):
- Clean chess board UI with minimal distractions.
- LED looking clocks.
- Move animations.
- Smart scroll.
- Channel tabs.
- resizable board and tab area with adjusters.
- many available sets.
- css based so easy to change anything if you pull the source.
- Timeseal2.
- Drag and drop and 'click-click' move.
- Premove
- Move validation.
- Preferences/Username/Pwd saved in local storage.
- ECO/Opening description lookup based on moves made.
- Fast and efficient, written in ES6.

Road Map (Current phase PRE-ALPHA):
ALPHA:
- Change UI for perspectives, examine, observe, playing, playing end.
  - Add auto draw, resign buttons for playing.
  - Add analysis mode when playing end or observing.
- Add stockfish 17 web-assembly. Add an analysis mode when playing end or observing.
- Preferences:
  - Expand preferences a bit (not too much).
- Regression testing.
  - When the board is flipped, it is not adjusting for the next game.
  - Fix the move list not populating bugs.
  - Test all functionality.
BETA:
- Use AI to create a move validation API.
  - Automaticly keep track of moves and times per move.
  - Handle premove validation.
  - Handle move validation.
  - Handle crazyhouse, suicide, losers, chess960, atomic.
  - Handle pieces in hand, for crazyhouse.
- Add crazyhouse support.
1.0: (For phone/tablet support. Added after everything is in place)
- More changes for Responsive web design that work on mobile and tablets. (Last after features are added.)
  - Add a layout when width is an issue that places the clocks ontop and underneath the board to reduce width.


Not planned at this time. Let me know if you would like it added:
- Bughouse support.
- Viewing multiple boards at once.