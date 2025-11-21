# JavaScript Modules Documentation

This document describes the modular JavaScript architecture of the portfolio website.

## Overview

The JavaScript code has been refactored from a single monolithic file (`main.js`) into multiple focused modules for better maintainability, debugging, and code organization.

## Module Structure

### 1. `utils.js` - Utility Functions
**Purpose**: Core utility functions used across the application

**Key Functions**:
- `generateRandomGradient()` - Generates random gradient colors for the background
- `applyRandomGradient()` - Applies the gradient to the document body
- `show(s)` - Toggle visibility helper function
- `changeActual(s)` - Change active element helper

**Global Variables**:
- `modes` - Array of visibility states
- `mode` - Current visibility mode
- `actual` - Currently active element

---

### 2. `tabs.js` - Tab Navigation
**Purpose**: Handles tab switching and navigation between different views

**Key Functions**:
- `showTab(tabId)` - Shows specified tab and hides all others

**Global Variables**:
- `currentTab` - Currently active tab ID

---

### 3. `repositories.js` - Repository Display
**Purpose**: Renders repository information and statistics

**Key Functions**:
- `displayRepositories(data)` - Creates and displays repository cards on the main overview
- `generateIndividualRepoTabs(data)` - Generates detailed individual tabs for each repository

**Features**:
- Repository cards with name, description, size, stars, and forks
- Language breakdown for each repository
- Individual detailed views with README rendering (uses marked.js)
- Statistics grid with formatted data

---

### 4. `languages.js` - Language Statistics
**Purpose**: Displays programming language usage statistics

**Key Functions**:
- `displayLanguageStats(data)` - Creates visual representation of language usage across all repositories

**Features**:
- Percentage-based language bars
- Sorted by usage (highest to lowest)
- Summary of total repositories analyzed

---

### 5. `graph.js` - Graph Visualization
**Purpose**: Animated background graph/network visualization

**Key Classes**:
- `Node` - Represents a node in the graph with position, velocity, and connections

**Key Functions**:
- `GenerateGraph(canvasWidth, canvasHeight)` - Creates random graph structure
- `initGraph()` - Initializes the graph canvas and animation
- `resizeCanvas()` - Handles window resize events
- `animateGraph()` - Main animation loop
- `removeRandomEdges()` - Periodically removes and recreates edges
- `startGlowCycle()` - Initiates glow effect on edges
- `updateGlowIntensity()` - Manages glow animation timing

**Global Variables**:
- `graphCanvas`, `graphCtx`, `graphNodes` - Canvas and graph state
- `glowIntensity`, `isGlowingPhase` - Glow effect state

**Features**:
- Animated nodes moving across the canvas
- Dynamic connections between nodes
- Periodic edge removal and regeneration
- Pulsing glow effect every 20 seconds
- Responsive to window resize

---

### 6. `app.js` - Application Initialization
**Purpose**: Main entry point and data loading orchestration

**Key Functions**:
- `loadRepoStats()` - Fetches and loads repository statistics from JSON file

**Flow**:
1. Fetches `data/repo-stats.json`
2. Calls `displayRepositories()` to show repository list
3. Calls `displayLanguageStats()` to show language statistics
4. Calls `generateIndividualRepoTabs()` to create detailed repo views

---

## Loading Order

The modules are loaded in the following order in `index.html`:

1. `utils.js` - Core utilities (must load first)
2. `tabs.js` - Tab navigation (depends on utils)
3. `languages.js` - Language display (standalone)
4. `repositories.js` - Repository display (depends on tabs)
5. `graph.js` - Graph visualization (depends on utils)
6. `app.js` - Main initialization (depends on all modules)

## Dependencies

### External Libraries
- **marked.js** - Markdown to HTML conversion for README files
- **github-markdown-dark.css** - GitHub-style markdown CSS

### Inter-module Dependencies
- `repositories.js` calls `showTab()` from `tabs.js`
- `graph.js` calls `applyRandomGradient()` from `utils.js`
- `app.js` calls functions from `repositories.js`, `languages.js`

## Page Initialization

On page load (`<body onload="loadRepoStats(); initGraph();">`):
1. `loadRepoStats()` - Loads and displays all repository data
2. `initGraph()` - Initializes the animated background graph

## Data Flow

```
data/repo-stats.json
        ↓
    loadRepoStats() (app.js)
        ↓
    ├── displayRepositories() (repositories.js)
    ├── displayLanguageStats() (languages.js)
    └── generateIndividualRepoTabs() (repositories.js)
```

## Advantages of Modular Structure

1. **Better Organization**: Each module has a clear, single responsibility
2. **Easier Debugging**: Issues can be isolated to specific modules
3. **Maintainability**: Changes to one feature don't affect others
4. **Code Reusability**: Modules can be reused or replaced independently
5. **Clearer Dependencies**: Module relationships are explicit
6. **Easier Testing**: Each module can be tested in isolation
7. **Better Collaboration**: Multiple developers can work on different modules

## Future Improvements

Potential enhancements to consider:

1. **ES6 Modules**: Convert to ES6 module syntax (`import`/`export`)
2. **Build System**: Add bundler (webpack, rollup) for production optimization
3. **TypeScript**: Add type safety
4. **Unit Tests**: Add test coverage for each module
5. **Code Splitting**: Load modules on-demand for better performance
