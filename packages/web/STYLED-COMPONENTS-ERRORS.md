# Styled Components DOM Props Errors

This document tracks the styled-components prop errors and their fixes.

## Error Summary

All these errors occur because styled-components is passing custom props to DOM elements. The solution is to use
transient props (prefixed with `$`) which are automatically filtered out.

## Errors to Fix

### 1. DigitalClock Component

- [x] **Error**: `isLowTime` prop being sent to DOM
- [x] **Error**: `isActive` prop being sent to DOM
- **File**: `/src/components/ui/DigitalClock.tsx`
- **Solution**: Change to `$isLowTime` and `$isActive`
- **Status**: ✅ FIXED

### 2. DigitalScore Component

- [x] **Error**: `isPositive` prop being sent to DOM
- [x] **Error**: `isNegative` prop being sent to DOM
- **File**: `/src/components/ui/DigitalScore.tsx`
- **Solution**: Change to `$isPositive` and `$isNegative`
- **Status**: ✅ FIXED

### 3. EvaluationBar Component

- [x] **Error**: `percentage` prop being sent to DOM
- **File**: `/src/components/ui/DigitalScore.tsx`
- **Solution**: Change to `$percentage`
- **Status**: ✅ FIXED

### 4. LandscapeLayout Component

- [x] **Error**: `isCollapsed` prop being sent to DOM
- **File**: `/src/components/layout/LandscapeLayout.tsx`
- **Solution**: Change to `$isCollapsed`
- **Status**: ✅ FIXED

## Additional Errors Found

### 5. LayoutToggle Component

- [x] **Error**: `isActive` prop being sent to DOM on button element
- **File**: `/src/components/ui/LayoutToggle.tsx`
- **Solution**: Change to `$isActive`
- **Status**: ✅ FIXED

### 6. TabButton Component (in LandscapeLayout)

- [x] **Error**: `isActive` prop being sent to DOM
- **File**: `/src/components/layout/LandscapeLayout.tsx`
- **Solution**: Change to `$isActive`
- **Status**: ✅ FIXED

### 7. ThemeToggle Component

- [x] **Error**: `isActive` prop being sent to DOM on button element
- **File**: `/src/components/ui/ThemeToggle.tsx`
- **Solution**: Change to `$isActive`
- **Status**: ✅ FIXED

## Other Fixes

### 8. Favicon 404 Error

- [x] **Error**: GET http://localhost:5173/favicon.ico 404
- **Solution**: Added inline SVG favicon to index.html
- **Status**: ✅ FIXED

## Progress Log

- **2025-01-29**: Document created, starting fixes...
- **2025-01-29**: All initial styled-components DOM prop errors fixed
- **2025-01-29**: Found and fixed additional errors in LayoutToggle, TabButton, and ThemeToggle components
- **2025-01-29**: All styled-components errors resolved - total of 7 components fixed
- **2025-01-29**: Added favicon to eliminate 404 error

## New Errors Found

### 9. PortraitLayout Component

- [x] **Error**: `isExpanded` prop being sent to DOM
- [x] **Error**: `panelHeight` prop being sent to DOM
- **File**: `/src/components/layout/PortraitLayout.tsx`
- **Solution**: Change to `$isExpanded` and `$panelHeight`
- **Status**: ✅ FIXED