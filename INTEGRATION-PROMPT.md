# Chess Interface Hybrid Layout Integration

## Context
I've developed a hybrid layout system for my chess interface that supports both standard (side-by-side) and compact (top/bottom player info) layouts with proper perspective handling. I need to integrate this cleanly with my existing codebase.

## Current Architecture
1. Existing layout uses absolute positioning with CSS variables
2. New hybrid system uses flexbox/grid with responsive breakpoints
3. Only the new Hybrid system should exist at the end of the integration.

## Integration Requirements
1. Support for both layout modes (standard and compact)
2. Proper perspective handling (white/black orientation)
3. Responsive design across all device sizes
4. Clean, maintainable code structure

## Specific Integration Points

### CSS Integration
- How to merge the new CSS with existing styles without conflicts
- Strategy for handling CSS variables between systems
- Approach for responsive breakpoints that work with both systems

### JavaScript Integration
- How to initialize the LayoutManager alongside existing code
- Best way to handle layout switching between modes
- Strategy for updating player info and clocks in both systems
- Approach for handling board resizing in both systems

### HTML Structure
- Changes needed to support both layout systems
- How to structure containers for maximum compatibility
- Strategy for progressive enhancement

## Technical Constraints
- Must work on mobile (min 375x776px)
- Must support landscape orientation (776x375px)
- Must maintain all existing chess functionality
- Should avoid !important and CSS specificity wars

## Transition Strategy
- Testing approach for both systems
- Clear errors are logged if errors occur for easy debugging and fixing.
- Remove all testing html, documentation, and javascript from the final product.

Please provide a detailed integration plan with code examples for key integration points.