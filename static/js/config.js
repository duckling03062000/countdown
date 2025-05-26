// Environment Configuration
const CONFIG = {
    // Set to "1" for staging environment, "0" for production
    STAGING: "1",
    
    // Messages
    MESSAGES: {
        // Array of future date messages to cycle through in round-robin
        FUTURE_DATE_OPTIONS: [
            "Patience QT!",
            "Good things take time… XD",
            "This page is playing hide-and-seek!",
            "Shh… it's a secret, too early to reveal",
            "No spoilers yet!"
        ],
        
        // Array of Bootstrap alert colors to cycle through for future date messages
        FUTURE_COLOR_OPTIONS: [
            "primary",   // Blue - #3b82f6
            "success",   // Green - #10b981
            "warning",   // Yellow - #f59e0b
            "secondary", // Gray - #64748b
            "info"       // Cyan - #06b6d4
        ],
        
        // Function to get the next message in round-robin sequence
        getFutureMessage: function() {
            let messageIndex = 0;
            
            // Try to get the current index from localStorage
            try {
                // Get the stored index or default to 0
                const storedIndex = localStorage.getItem('messageIndex');
                messageIndex = storedIndex ? parseInt(storedIndex, 10) : 0;
                
                // Increment for next time (with wraparound)
                const nextIndex = (messageIndex + 1) % this.FUTURE_DATE_OPTIONS.length;
                localStorage.setItem('messageIndex', nextIndex.toString());
            } catch (e) {
                // If localStorage fails, just use index 0
                console.warn('Could not access localStorage for message rotation', e);
            }
            
            // Return the message at the current index (with bounds checking)
            const safeIndex = messageIndex % this.FUTURE_DATE_OPTIONS.length;
            return {
                text: this.FUTURE_DATE_OPTIONS[safeIndex],
                color: this.FUTURE_COLOR_OPTIONS[safeIndex]
            };
        }
    }
};

// Don't modify this line - it exports the configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} 