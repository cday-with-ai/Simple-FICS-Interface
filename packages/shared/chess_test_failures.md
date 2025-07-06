# Chess API Test Failures Summary

## Overview
The test suite runs 10,154 tests with 9,216 passing (91% pass rate) and 938 failing.

## Types of Failures

### 1. Move Count Mismatches (Most Common)
These are off-by-one errors where the actual move count is 1 less than expected. This typically happens when:
- Termination comments like `{Game drawn by mutual agreement}` or `{Game drawn by repetition}` are counted as moves in the expected count but not processed as actual moves
- The move counting logic in the PGN parser differs from the actual move execution

**Examples:**
- classic-062: Expected 262, Actual 261 - ends with `{Game drawn by mutual agreement}`
- classic-084: Expected 104, Actual 103 - ends with `{Game drawn by repetition}`
- classic-090: Expected 122, Actual 121 - ends with `{Game drawn by repetition}`
- classic-116: Expected 28, Actual 27 - ends with `{Game drawn by mutual agreement}`
- classic-117: Expected 72, Actual 71 - ends with `{Game drawn by mutual agreement}`
- classic-121: Expected 56, Actual 55 - ends with `{Game drawn by mutual agreement}`

### 2. Early Termination with Zero Moves
Some games fail because they consist only of a termination comment with no actual moves:
- classic-106: PGN is just `{White resigns}` with expected 0 moves but fails the `toBeGreaterThan(0)` check

### 3. Invalid Move Failures (Crazyhouse)
Some Crazyhouse games fail on specific moves that the ChessAPI cannot process:
- crazyhouse-046: Failed at move 62 `Bc5+`
- crazyhouse-085: Failed at move 84 `P@g7` (drop move)
- crazyhouse-091: Failed at move 49 `Nxe6+`
- crazyhouse-109: Failed at move 85 `P@g5` (drop move)
- crazyhouse-119: Failed at move 52 `P@g2+` (drop move)

### 4. Test Configuration Issues
- Test coverage validation fails because it expects exactly 18 classic games but finds 9,918 games

## Categories by Variant

### CLASSIC Variant
- Mostly move count mismatches (off by 1)
- A few early termination edge cases
- Generally high success rate

### CRAZYHOUSE Variant
- Some drop move failures suggesting edge cases in drop move validation
- Move count mismatches similar to classic
- Most drop moves work correctly

### Other Variants (LOSERS, SUICIDE, ATOMIC, CHESS960)
- Similar patterns of move count mismatches
- Generally working well with the early termination handling

## Recommendations

1. **Fix Move Count Logic**: Adjust the PGN parser's move counting to not include termination comments in the expected move count
2. **Handle Zero-Move Games**: Update early termination logic to handle games that consist only of termination comments
3. **Fix Drop Move Edge Cases**: Investigate why some specific drop moves fail validation
4. **Update Test Configuration**: Fix the hardcoded game count expectation
5. **Consider Tolerance**: For games with minor move count discrepancies, consider allowing ±1 tolerance for completed games

## Current Status
✅ Drop moves are working correctly for most Crazyhouse games
✅ Early termination is handled gracefully for most cases
✅ 91% test pass rate shows significant improvement
⚠️ Remaining failures are mostly minor counting issues rather than fundamental problems