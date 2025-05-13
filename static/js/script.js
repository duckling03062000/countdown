document.addEventListener('DOMContentLoaded', function() {
    // Target date: June 21st of the current year
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(currentYear, 5, 21); // Month is 0-indexed (5 = June)
    
    // If the target date for this year has passed, set to next year
    if (new Date() > targetDate) {
        targetDate.setFullYear(currentYear + 1);
    }
    
    // Update countdown timer
    function updateCountdown() {
        const currentDate = new Date();
        const timeDifference = targetDate - currentDate;
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        // Update DOM
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Update page title with days remaining
        document.title = `${days} Days Until Summer Solstice`;
    }
    
    // Initial update
    updateCountdown();
    
    // Update the countdown every second
    setInterval(updateCountdown, 1000);
    
    // Update today's message
    updateTodayMessage();
    
    // Generate calendar days
    generateCalendar();
    
    // Set up modal functionality
    setupModal();
});

// Update today's message
function updateTodayMessage() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const messageElement = document.getElementById('daily-message');
    
    // Get the message of the day
    const dayContent = getDailyContent(todayStr);
    
    // If it's a known special day with custom content
    if (dailyContent[todayStr]) {
        // Extract text content from HTML string
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = dailyContent[todayStr].content;
        
        // Find a paragraph or heading to use as message
        const paragraph = tempDiv.querySelector('p');
        const heading = tempDiv.querySelector('h4, h3');
        
        if (paragraph) {
            messageElement.textContent = paragraph.textContent;
        } else if (heading) {
            messageElement.textContent = heading.textContent;
        } else {
            // Default to a generic message
            setDefaultTodayMessage(messageElement, today);
        }
    } else {
        // Set default message based on day of week
        setDefaultTodayMessage(messageElement, today);
    }
}

// Set a default message based on day of week
function setDefaultTodayMessage(element, date) {
    const dayOfWeek = date.getDay();
    const targetYear = date.getFullYear();
    const targetDate = new Date(targetYear, 5, 21); // June 21st
    
    // Calculate days remaining
    const daysRemaining = Math.ceil((targetDate - date) / (1000 * 60 * 60 * 24));
    
    // If summer solstice has passed this year
    if (date > targetDate && date.getMonth() <= 11) {
        element.textContent = `Summer is here! The next solstice will be in ${daysRemaining} days.`;
        return;
    }
    
    // Default messages by day of week
    const messages = [
        `Sunday vibes! ${daysRemaining} days until the summer solstice. Time to reflect and prepare for the week ahead.`, // Sunday
        `Monday motivation! Start your week strong with ${daysRemaining} days to go until the summer solstice.`, // Monday
        `Tuesday momentum! ${daysRemaining} days left until we reach the longest day of the year.`, // Tuesday
        `Wednesday wisdom: Did you know the summer solstice has been celebrated for thousands of years? Only ${daysRemaining} days to go!`, // Wednesday
        `Thursday thoughts: Just ${daysRemaining} more days until the summer solstice arrives. Keep going!`, // Thursday
        `Friday feeling! You made it through the week with only ${daysRemaining} days until the summer solstice.`, // Friday
        `Saturday spirit! Enjoy your weekend knowing we're just ${daysRemaining} days away from the summer solstice.` // Saturday
    ];
    
    element.textContent = messages[dayOfWeek];
}

// Generate calendar days from May 13th to June 21st
function generateCalendar() {
    const calendarElement = document.getElementById('calendar');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const targetDate = new Date(currentYear, 5, 21); // June 21st
    
    // If the target date for this year has passed, set to next year
    if (currentDate > targetDate) {
        targetDate.setFullYear(currentYear + 1);
    }
    
    // Clear any existing content
    calendarElement.innerHTML = '';
    
    // Start date: May 13th of the current year (or next year if target is next year)
    const startDate = new Date(targetDate.getFullYear(), 4, 13); // Month is 0-indexed (4 = May)
    
    // Create weekday headers
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdayRow = document.createElement('div');
    weekdayRow.className = 'calendar-weekdays';
    
    weekdays.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-weekday';
        dayHeader.textContent = day;
        weekdayRow.appendChild(dayHeader);
    });
    
    calendarElement.appendChild(weekdayRow);
    
    // Add month header for May
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    const mayHeader = document.createElement('h4');
    mayHeader.className = 'calendar-month-header';
    mayHeader.textContent = `${monthNames[4]} ${startDate.getFullYear()}`;
    calendarElement.appendChild(mayHeader);
    
    // Create a grid for May
    const mayGrid = document.createElement('div');
    mayGrid.className = 'calendar-month-grid';
    
    // Calculate the weekday for May 13th
    const may13Weekday = startDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
    
    // Add empty cells for days before May 13th in the week
    for (let i = 0; i < may13Weekday; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        mayGrid.appendChild(emptyDay);
    }
    
    // Add days from May 13 to May 31
    const lastDayOfMay = 31;
    for (let i = 13; i <= lastDayOfMay; i++) {
        const dateIterator = new Date(startDate.getFullYear(), 4, i);
        dateIterator.setHours(0, 0, 0, 0);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // Add classes based on date status
        if (isSameDay(dateIterator, currentDate)) {
            dayElement.classList.add('today');
        } else if (dateIterator < currentDate) {
            dayElement.classList.add('past');
        } else if (dateIterator > targetDate) {
            dayElement.classList.add('disabled');
        } else {
            dayElement.classList.add('future');
        }
        
        // Set the day number and date attribute
        dayElement.textContent = i;
        dayElement.setAttribute('data-date', dateIterator.toISOString().split('T')[0]);
        
        // Add appropriate click event based on environment and date
        addDayClickHandler(dayElement, dateIterator, currentDate);
        
        mayGrid.appendChild(dayElement);
    }
    
    calendarElement.appendChild(mayGrid);
    
    // Add month header for June
    const juneHeader = document.createElement('h4');
    juneHeader.className = 'calendar-month-header';
    juneHeader.textContent = `${monthNames[5]} ${startDate.getFullYear()}`;
    calendarElement.appendChild(juneHeader);
    
    // Create another weekday header for June
    const juneWeekdayRow = weekdayRow.cloneNode(true);
    calendarElement.appendChild(juneWeekdayRow);
    
    // Create grid for June
    const juneGrid = document.createElement('div');
    juneGrid.className = 'calendar-month-grid';
    
    // Find the first day of June
    const firstDayOfJune = new Date(startDate.getFullYear(), 5, 1);
    const juneStartingWeekday = firstDayOfJune.getDay();
    
    // Add empty cells for days before the first of June
    for (let i = 0; i < juneStartingWeekday; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        juneGrid.appendChild(emptyDay);
    }
    
    // Add days from June 1 to June 21
    for (let i = 1; i <= 21; i++) {
        const dateIterator = new Date(startDate.getFullYear(), 5, i);
        dateIterator.setHours(0, 0, 0, 0);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // Add classes based on date status
        if (isSameDay(dateIterator, currentDate)) {
            dayElement.classList.add('today');
        } else if (dateIterator < currentDate) {
            dayElement.classList.add('past');
        } else if (dateIterator > targetDate) {
            dayElement.classList.add('disabled');
        } else {
            dayElement.classList.add('future');
        }
        
        // Set the day number and date attribute
        dayElement.textContent = i;
        dayElement.setAttribute('data-date', dateIterator.toISOString().split('T')[0]);
        
        // Add appropriate click event based on environment and date
        addDayClickHandler(dayElement, dateIterator, currentDate);
        
        juneGrid.appendChild(dayElement);
    }
    
    calendarElement.appendChild(juneGrid);
}

// Helper function to check if two dates are the same day
function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() && 
           date1.getMonth() === date2.getMonth() && 
           date1.getFullYear() === date2.getFullYear();
}

// Open modal with content for the clicked day
function openDayModal(event) {
    const dateStr = event.currentTarget.getAttribute('data-date');
    const dateParts = dateStr.split('-');
    const clickedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    
    // Set modal title with the date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('dayModalLabel').textContent = clickedDate.toLocaleDateString('en-US', options);
    
    // Get content for this day
    const content = getDailyContent(dateStr);
    document.getElementById('modalContent').innerHTML = content;
    
    // Open the modal
    const modal = new bootstrap.Modal(document.getElementById('dayModal'));
    modal.show();
}

// Set up modal functionality
function setupModal() {
    const modal = document.getElementById('dayModal');
    modal.addEventListener('hidden.bs.modal', function() {
        // Reset modal content when closed
        document.getElementById('modalContent').innerHTML = '';
    });
}

// Daily content data
const dailyContent = {
    // June 2024 example content
    // Format is 'YYYY-MM-DD': { type: 'note|song', content: '...' }
    
    // Current date with Spotify embed
    [new Date().toISOString().split('T')[0]]: {
        type: 'song',
        content: '<div class="text-center mb-3"><h4>Today\'s Special Song</h4></div><iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/4TobDQpylJNxkXMH1QUvTp?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe><p class="mt-3">Enjoy this special song for today!</p>'
    },
    
    // Example song embeds
    '2024-06-01': {
        type: 'song',
        content: '<div class="text-center mb-3"><h4>Summertime Anticipation</h4></div><iframe width="100%" height="315" src="https://www.youtube.com/embed/f5omECqDrQM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><p class="mt-3">Kick off June with this summer classic! What are you looking forward to most this summer?</p>'
    },
    
    '2024-06-05': {
        type: 'song',
        content: '<div class="text-center mb-3"><h4>Midweek Pick-Me-Up</h4></div><iframe src="https://open.spotify.com/embed/track/6nek1Nin9q48AVZcWs9e9D" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe><p class="mt-3">A perfect song to boost your energy through the rest of the week!</p>'
    },
    
    '2024-06-10': {
        type: 'song',
        content: '<div class="text-center mb-3"><h4>Countdown: 11 Days Left!</h4></div><iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/571035771&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><p class="mt-3">Getting closer to our special day. How are you preparing?</p>'
    },
    
    // Example notes and reflections
    '2024-06-03': {
        type: 'note',
        content: '<div class="alert alert-info p-4"><h4 class="text-center mb-3">18 Days Until June 21st</h4><p>Time for some reflection: What have you accomplished so far this year? What do you hope to achieve by June 21st?</p><p>Write down three goals you want to complete before summer officially begins:</p><ol><li>_____________________</li><li>_____________________</li><li>_____________________</li></ol></div>'
    },
    
    '2024-06-07': {
        type: 'note',
        content: '<div class="alert alert-warning p-4"><h4 class="text-center mb-3">Two Weeks To Go!</h4><p>Today is a good day to start planning how you\'ll celebrate the summer solstice on June 21st.</p><p>Some traditional ways people celebrate:</p><ul><li>Watch the sunrise or sunset</li><li>Have a bonfire with friends</li><li>Create a flower crown</li><li>Go for a hike or spend time in nature</li><li>Have a picnic</li></ul><p class="mt-3">What will your tradition be?</p></div>'
    },
    
    '2024-06-15': {
        type: 'note',
        content: '<div class="card"><div class="card-header bg-primary text-white"><h4 class="text-center m-0">Less than a week to go!</h4></div><div class="card-body"><p>The summer solstice is the longest day of the year in the Northern Hemisphere. On June 21st, we\'ll experience the maximum amount of daylight.</p><p>Did you know? The word "solstice" comes from the Latin words "sol" (sun) and "sistere" (to stand still) because the sun appears to pause before reversing direction.</p><div class="text-center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Earth-lighting-summer-solstice_EN.png/640px-Earth-lighting-summer-solstice_EN.png" class="img-fluid rounded mt-3" alt="Summer Solstice Diagram"></div></div></div>'
    },
    
    '2024-06-20': {
        type: 'note',
        content: '<div class="alert alert-success p-4"><h4 class="text-center mb-3">Eve of the Solstice</h4><p>Tomorrow is the big day! The summer solstice marks the official start of summer and the longest day of the year.</p><p>Tonight is the perfect time to set your intentions for the season ahead.</p><p>Take a moment to write down what you want this summer to mean for you:</p><textarea class="form-control mt-3 mb-3" rows="4" placeholder="My summer intentions..."></textarea><p class="font-italic">See you tomorrow for the celebration!</p></div>'
    },
    
    '2024-06-21': {
        type: 'celebration',
        content: '<div class="text-center"><h3 class="mb-4">🌞 Happy Summer Solstice! 🌞</h3><p class="lead">Today marks the official start of summer and the longest day of the year!</p><div class="my-4"><img src="https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" class="img-fluid rounded" alt="Summer Celebration"></div><p>Take time today to enjoy the abundance of sunlight, connect with nature, and celebrate the season of growth and vitality.</p><div class="mt-4 mb-3"><iframe width="100%" height="315" src="https://www.youtube.com/embed/u4XJ9xejgOA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><p>Here\'s to a beautiful, joy-filled summer ahead!</p></div>'
    }
};

// Get content for a specific day
function getDailyContent(dateStr) {
    // If we have content for this specific day, return it
    if (dailyContent[dateStr]) {
        return dailyContent[dateStr].content;
    }
    
    // If we don't have specific content, generate a generic message based on the day
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay();
    
    // Calculate days until June 21st
    const targetYear = date.getFullYear();
    const targetDate = new Date(targetYear, 5, 21); // June 21st
    
    // If the date has passed June 21st, we'll show a post-solstice message
    if (date.getMonth() === 5 && date.getDate() > 21) {
        return '<div class="text-center"><h4>Summer is Here!</h4><p>The summer solstice has passed, and we\'re now enjoying the season of light and warmth!</p></div>';
    }
    
    // Calculate days remaining
    const daysRemaining = Math.ceil((targetDate - date) / (1000 * 60 * 60 * 24));
    
    // Generate content based on day of week
    switch(dayOfWeek) {
        case 0: // Sunday
            return `<div class="text-center"><h4>Sunday Reflections</h4><p>Take some time to relax and prepare for the week ahead.</p><p class="mt-3">Only ${daysRemaining} days until the summer solstice!</p></div>`;
        case 1: // Monday
            return `<div class="text-center"><h4>Monday Motivation</h4><p>Start your week strong! You've got this!</p><p class="mt-3">The summer solstice is ${daysRemaining} days away!</p></div>`;
        case 5: // Friday
            return `<div class="text-center"><h4>Friday Celebration</h4><p>You made it through another week!</p><p class="mt-3">Just ${daysRemaining} more days until we reach the summer solstice.</p></div>`;
        default:
            return `<div class="text-center"><h4>Another Day Closer!</h4><p>Each day brings you closer to June 21st.</p><p class="mt-3">Only ${daysRemaining} days to go until the summer solstice!</p></div>`;
    }
}

// Helper function to add appropriate click event handler based on environment and date
function addDayClickHandler(element, date, currentDate) {
    // In staging environment, all days are clickable
    if (CONFIG.STAGING) {
        element.addEventListener('click', openDayModal);
        return;
    }
    
    // In production, only past and present days are clickable
    if (date <= currentDate) {
        element.addEventListener('click', openDayModal);
    } else {
        // For future dates in production, show a waiting message
        // Also add the current color class to indicate the color cycle position
        try {
            // Get current index to determine which color to apply
            const storedIndex = localStorage.getItem('messageIndex') || 0;
            const colorIndex = parseInt(storedIndex, 10) % CONFIG.MESSAGES.FUTURE_COLOR_OPTIONS.length;
            const currentColor = CONFIG.MESSAGES.FUTURE_COLOR_OPTIONS[colorIndex];
            
            // Add the color class to the element
            element.classList.add(`future-${currentColor}`);
        } catch (e) {
            // If localStorage fails, don't add a color class
            console.warn('Could not access localStorage for color rotation', e);
        }
        
        // Add click event for the future date message
        element.addEventListener('click', function(event) {
            showFutureDateMessage(date);
        });
    }
}

// Show message for future dates in production environment
function showFutureDateMessage(date) {
    // Get the next message and color in the rotation
    const messageInfo = CONFIG.MESSAGES.getFutureMessage();
    const message = messageInfo.text;
    const colorClass = messageInfo.color;
    
    // Choose icon based on which message was selected
    let iconClass = 'fa-calendar-day';
    
    if (message.includes('QT')) {
        iconClass = 'fa-magic';
    } else if (message.includes('Good things')) {
        iconClass = 'fa-envelope';
    } else if (message.includes('hide-and-seek')) {
        iconClass = 'fa-eye';
    } else if (message.includes('secret')) {
        iconClass = 'fa-user-secret';
    } else if (message.includes('spoilers')) {
        iconClass = 'fa-gift';
    }
    
    // Create content for the modal with the specific color class
    const content = `
        <div class="alert alert-${colorClass} text-center p-4">
            <i class="fas ${iconClass} fa-3x mb-3"></i>
            <p class="lead">${message}</p>
        </div>
    `;
    
    // Set modal title and content
    document.getElementById('dayModalLabel').textContent = 'Future Date';
    document.getElementById('modalContent').innerHTML = content;
    
    // Open the modal
    const modal = new bootstrap.Modal(document.getElementById('dayModal'));
    modal.show();
}

// Example of how to add audio playback to a day's content
// You can use this in the dailyContent object
function createAudioContentExample() {
    return `
        <div class="text-center mb-4">
            <h4>Audio Message Example</h4>
            <p class="mb-3">This demonstrates playing an audio file from the static folder:</p>
            
            <audio controls class="w-100 mb-3">
                <source src="static/audio/sample.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            
            <p class="text-muted">You can add custom audio files to the static/audio folder.</p>
        </div>
    `;
}

// This is just an example - you can add it to dailyContent if needed
// Example usage:
// dailyContent['2024-05-15'] = {
//     type: 'audio',
//     content: createAudioContentExample()
// }; 