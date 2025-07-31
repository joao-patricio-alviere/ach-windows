# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple HTML/CSS/JavaScript web application that tracks ACH (Automated Clearing House) NACHA processing windows. The application displays real-time countdowns to submission deadlines and provides a comprehensive timetable with timezone conversions for both Same Day and Next Day ACH processing windows.

## Architecture

### Core Components

- **app.js:1-54** - ACH window data structure containing processing schedules, deadlines, and timezone information
- **app.js:55-119** - Time conversion and business day calculation utilities  
- **app.js:145-181** - Real-time countdown update system that refreshes every second
- **app.js:183-239** - Dynamic timetable population with timezone conversions
- **index.html** - Single-page application layout with countdown cards and processing timetable
- **style.css** - Comprehensive design system with CSS custom properties, responsive grid layout, and dark/light mode support

### Key Features

- **Live Countdowns**: Real-time timers showing time remaining until next submission deadline
- **Business Day Logic**: Automatically handles weekends and calculates next business day processing
- **Timezone Support**: Converts between UTC, Denver (MDT), Eastern (EDT), and Lisbon (WEST) timezones
- **Window Restrictions**: Handles special rules like Evening Window (Sunday-Thursday only)
- **Responsive Design**: Mobile-first approach with responsive grid layout

## Development

### Running the Application

This application is now packaged as an Electron standalone desktop application:

```bash
# Install dependencies (first time only)
npm install

# Run in development mode
npm start

# Run with developer tools open
npm run dev

# Build for distribution
npm run build

# Build for specific platforms
npm run build-mac    # macOS
npm run build-win    # Windows
npm run build-linux  # Linux
```

### File Structure

```
ach-window-tracker/
├── main.js         # Electron main process and window management
├── app.js          # Application logic and data
├── index.html      # HTML structure and layout  
├── style.css       # Complete design system and styling
├── package.json    # Dependencies and build configuration
├── build.js        # Custom build script
├── .gitignore      # Git ignore patterns
└── CLAUDE.md       # This file
```

### Electron Application Details

- **Window Configuration**: 1200x800 default size, minimum 800x600, with native menu bar
- **Security**: Context isolation enabled, node integration disabled for security
- **Menu System**: Custom application menu with reload, zoom, and developer tools
- **Cross-platform**: Builds available for macOS (Intel/Apple Silicon), Windows, and Linux

### Key Data Structures

- **achData.same_day_windows** - Array of same-day processing windows with deadlines and settlement times
- **achData.next_day_windows** - Array of next-day processing windows with special restrictions
- **achData.timezones** - Timezone offset mappings for conversions

### Important Functions

- **updateCountdowns()** - Core function that calculates and updates all countdown timers
- **getNextDeadline()** - Calculates next valid deadline considering business days and restrictions
- **convertTime()** - Handles timezone conversions between different regions
- **populateTimeTable()** - Dynamically generates the complete processing schedule table