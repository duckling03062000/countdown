# Countdown to June 21st

A simple, interactive countdown website that displays the time remaining until June 21st and provides daily clickable content.

## Folder Structure

```
countdown/
├── index.html              # Main HTML file
├── README.md               # This file
├── static/                 # Static assets folder
│   ├── css/                # CSS stylesheets
│   │   └── styles.css      # Main stylesheet
│   ├── js/                 # JavaScript files
│   │   ├── config.js       # Configuration settings
│   │   └── script.js       # Main JavaScript code
│   ├── images/             # Image assets
│   │   └── README.md       # Instructions for image assets
│   └── audio/              # Audio files
│       └── README.md       # Instructions for audio assets
```

## Features

- Real-time countdown to June 21st (automatically adjusts to the next year if the date has already passed)
- Calendar with clickable days from May 13th up to June 21st
- Modal pop-ups with custom content for each day
- Responsive design that works on desktop and mobile devices
- Support for embedding songs, notes, and other content

## How to Use

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Click on any day in the calendar to see the content for that day

## Customizing Content

### Adding Custom Daily Content

Edit the daily content in the `getDailyContent` function in the `static/js/script.js` file to add your custom content for specific dates.

### Environment Mode

The site has two modes controlled by the `STAGING` setting in `static/js/config.js`:

- **Production Mode** (`STAGING: false`): Only past and present days are clickable
- **Staging Mode** (`STAGING: true`): All days are clickable, allowing you to test future content

## Browser Compatibility

This website works with all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is open source and available for personal and commercial use. 