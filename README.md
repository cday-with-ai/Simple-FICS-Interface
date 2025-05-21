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

Road Map (Planned functionality that is broken or not implemented yet):
- Fix bug where when you flip and then observe a game the board orientation is off. labels for black pieces appear in the wrong place.+
  - Abide by fics flip flag on style 12. Currently not abiding.
- Add stay logged in preference.
- Make speed promotion checkboxes.
- More changes for Responsive web design that work on mobile and tablets.
  - Add a layout when width is an issue that places the clocks ontop and underneath the board to reduce width.
- Expand preferences a bit (not too much).


Not planned at this time: (If you want it, let me know I might add it.)
- Bughouse/Crazyhouse support.
- Viewing multiple boards at once.