# ACH NACHA Window Tracker

Real-time countdown and processing schedule for ACH (Automated Clearing House) NACHA windows with multi-timezone support.

![ACH Window Tracker](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

## Features

- **Live Countdowns**: Real-time timers showing time remaining until next submission deadlines
- **Multi-Timezone Support**: Displays deadlines in ET, UTC, Lisbon (WEST), and Denver (MDT)
- **Business Day Logic**: Automatically handles weekends and calculates next business day processing
- **Window Restrictions**: Handles special rules like Evening Window (Sunday-Thursday only)
- **Responsive Design**: Mobile-first approach with responsive grid layout
- **Dual Deployment**: Available as both a desktop app and web application

## Live Demo

🌐 **[View Live Demo](https://joao-patricio-alviere.github.io/ach-window-tracker/)**

## Desktop Application

### Installation

Download the latest release for your platform:

- **macOS**: Download the `.dmg` file
- **Windows**: Download the `.exe` installer (coming soon)
- **Linux**: Download the `.AppImage` file (coming soon)

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-username/ach-window-tracker.git
cd ach-window-tracker

# Install dependencies
npm install

# Run in development mode
npm start

# Run with developer tools
npm run dev

# Build for distribution
npm run build

# Build for specific platforms
npm run build-mac    # macOS
npm run build-win    # Windows
npm run build-linux  # Linux
```

## Web Application

The application is automatically deployed to GitHub Pages and accessible at:
`https://your-username.github.io/ach-window-tracker/`

### Local Web Development

```bash
# Serve the docs directory locally
cd docs
python -m http.server 8000
# Or use any static file server

# Open http://localhost:8000 in your browser
```

## Deployment

### GitHub Pages Deployment

1. **Fork this repository**
2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Set source to "GitHub Actions"
3. **Push changes** - the site will automatically deploy via GitHub Actions

### Custom Domain (Optional)

To use a custom domain:

1. Edit `docs/CNAME` and add your domain
2. Configure your DNS to point to GitHub Pages
3. Enable HTTPS in repository settings

## ACH Processing Windows

### Same Day Windows
- **Window 1**: 10:30 AM ET deadline → 1:00 PM ET settlement
- **Window 2**: 2:45 PM ET deadline → 5:00 PM ET settlement  
- **Window 3**: 4:45 PM ET deadline → 6:00 PM ET settlement

### Next Day Windows
- **Overnight**: 2:15 AM ET deadline → 8:30 AM ET settlement (next day)
- **Evening**: 8:00 PM ET deadline → 8:30 AM ET settlement (Sun-Thu only)
- **Late Evening**: 10:45 PM ET deadline → 8:30 AM ET settlement (next day)

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Desktop**: Electron
- **Deployment**: GitHub Pages, GitHub Actions
- **Styling**: Custom CSS with design system and dark/light mode support

## File Structure

```
ach-window-tracker/
├── docs/                 # GitHub Pages deployment files
│   ├── index.html       # Web-optimized HTML
│   ├── style.css        # Styles
│   ├── app.js          # Application logic
│   └── .nojekyll       # GitHub Pages config
├── .github/workflows/   # GitHub Actions
│   └── deploy.yml      # Auto-deployment workflow
├── main.js             # Electron main process
├── index.html          # Electron version HTML
├── style.css           # Main stylesheet
├── app.js             # Core application logic
├── package.json       # Dependencies and scripts
└── README.md          # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This tool is for informational purposes only. Always verify ACH processing windows with your financial institution as they may have different internal cutoff times or additional restrictions.