document.addEventListener('DOMContentLoaded', function() {
    // Target date: June 21st, 2025
    const targetDate = new Date(2025, 5, 21); // Month is 0-indexed (5 = June)
    
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
        document.title = `${days} Days Until Summer 2025`;
    }
    
    // Initial update
    updateCountdown();
    
    // Update the countdown every second
    setInterval(updateCountdown, 1000);
    
    // Comment out updateTodayMessage since we removed that container
    // updateTodayMessage();
    
    // Generate calendar days
    generateCalendar();
    
    // Set up modal functionality
    setupModal();
    
    // Listen for when a modal is shown and set up audio player interaction
    const modal = document.getElementById('dayModal');
    if (modal) {
        modal.addEventListener('shown.bs.modal', function() {
            setupAudioPlayerInteraction();
        });
    }
});

// Comment out the functions we no longer need

/* 
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
*/

// Generate calendar days from May 13th to June 21st
function generateCalendar() {
    const calendarElement = document.getElementById('calendar');
    const currentDate = new Date();
    const targetYear = 2025;
    const targetDate = new Date(targetYear, 5, 21); // June 21st, 2025
    
    // Current date projected to 2025 for comparison
    // This is needed to determine which dates should be "past" in our 2025 calendar
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    // Create a date object for the same month/day but in our target year
    const projectedCurrentDate = new Date(targetYear, currentMonth, currentDay);
    
    // Clear any existing content
    calendarElement.innerHTML = '';
    
    // Start date: May 13th, 2025
    const startDate = new Date(targetYear, 4, 13); // Month is 0-indexed (4 = May)
    
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
        if (isSameDay(dateIterator, projectedCurrentDate)) {
            dayElement.classList.add('today');
        } else if (dateIterator < projectedCurrentDate) {
            dayElement.classList.add('past');
        } else if (dateIterator > targetDate) {
            dayElement.classList.add('disabled');
        } else {
            dayElement.classList.add('future');
        }
        
        // Format the date string properly
        const year = dateIterator.getFullYear();
        const month = String(dateIterator.getMonth() + 1).padStart(2, '0');
        const day = String(dateIterator.getDate()).padStart(2, '0');
        const formattedDateStr = `${year}-${month}-${day}`;
        
        // Set the day number and date attribute
        dayElement.textContent = i;
        dayElement.setAttribute('data-date', formattedDateStr);
        
        // Add appropriate click event based on environment and date
        addDayClickHandler(dayElement, dateIterator, projectedCurrentDate);
        
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
        if (isSameDay(dateIterator, projectedCurrentDate)) {
            dayElement.classList.add('today');
        } else if (dateIterator < projectedCurrentDate) {
            dayElement.classList.add('past');
        } else if (dateIterator > targetDate) {
            dayElement.classList.add('disabled');
        } else {
            dayElement.classList.add('future');
        }
        
        // Format the date string properly
        const year = dateIterator.getFullYear();
        const month = String(dateIterator.getMonth() + 1).padStart(2, '0');
        const day = String(dateIterator.getDate()).padStart(2, '0');
        const formattedDateStr = `${year}-${month}-${day}`;
        
        // Set the day number and date attribute
        dayElement.textContent = i;
        dayElement.setAttribute('data-date', formattedDateStr);
        
        // Add appropriate click event based on environment and date
        addDayClickHandler(dayElement, dateIterator, projectedCurrentDate);
        
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
    // Extract the date from the clicked element
    let dateStr;
    
    // Handle both direct clicks and events passed with data
    if (event.currentTarget && event.currentTarget.getAttribute) {
        dateStr = event.currentTarget.getAttribute('data-date');
    } else if (event.getAttribute) {
        dateStr = event.getAttribute('data-date');
    } else {
        console.error('Could not determine date from clicked element', event);
        return;
    }
    
    if (!dateStr) {
        console.error('No date found in clicked element', event);
        return;
    }
    
    console.log('Date clicked:', dateStr); // Debug log
    
    // Parse the date
    const dateParts = dateStr.split('-');
    const clickedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    
    // Ensure the date is correct by manually formatting it
    // This ensures no timezone issues affect the date string
    const year = clickedDate.getFullYear();
    const month = String(clickedDate.getMonth() + 1).padStart(2, '0'); // Add 1 since months are 0-indexed
    const day = String(clickedDate.getDate()).padStart(2, '0');
    const formattedDateStr = `${year}-${month}-${day}`;
    
    console.log('Formatted date string:', formattedDateStr); // Debug log
    
    // Set modal title with the date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('dayModalLabel').textContent = clickedDate.toLocaleDateString('en-US', options);
    
    // Get content for this day, using the corrected date string
    const content = getDailyContent(formattedDateStr);
    document.getElementById('modalContent').innerHTML = content;
    
    // Add the fade-in class for animation
    document.getElementById('modalContent').classList.add('fade-in');
    
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

// Create a variable for the May 13 content with image
const may13Content = `
<div class="text-center mb-4 fade-in">
    <div class="position-relative" style="max-width: 600px; margin: 0 auto;">
        <img src="static/images/song.jpeg" class="img-fluid rounded shadow mb-4" alt="Late Night Music" style="max-height: 600px;">
    </div>
    <p class="mt-3 lead" style="font-style: italic; font-size: 1.1rem;">
        Not advisable, but let's stay up till 5 in the morning, talking, listening to music 🫠 <br> 
        Who cares if it makes us mindless zombies, we'll atleast be happy zombies :)
    </p>
</div>
`;

// Create a variable for the May 14 flower content
const may14FlowerContent = `
<div class="text-center mb-4 fade-in">
    <h4 class="mb-3">Who's an artist? That's you :) </h4>
    <div class="position-relative" style="max-width: 500px; margin: 0 auto;">
        <img src="static/images/flowers.jpeg" class="img-fluid rounded shadow mb-3" alt="Flowers" style="max-height: 500px;">
    </div>
    <p class="mt-3">Cutest flower bouquet to ever exist! 💐</p>
</div>
`;

// Create a variable for the May 15 poem content
const may15PoemContent = `
<div class="text-center mb-4 fade-in">
    <h3 class="mb-4" style="color: #ff7e5f; text-shadow: 1px 1px 3px rgba(0,0,0,0.1); font-family: 'Poppins', sans-serif; font-weight: 600;">Who can write beautiful pieces? You!</h3>
    <div class="position-relative mb-4" style="max-width: 600px; margin: 0 auto;">
        <img src="static/images/poem.jpeg" class="img-fluid rounded shadow" alt="Dreams of Meeting" style="max-height: 600px;">
    </div>
    <div class="poem-container p-5" style="background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,244,240,0.9) 100%); border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.12); max-width: 600px; margin: 0 auto; border-left: 4px solid #ff7e5f;">
        <div style="position: relative;">
            <span style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 24px; color: #ff7e5f;">❝</span>
            <p class="mb-4" style="font-style: italic; line-height: 1.8; font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 1.05rem; color: #555;">
                I do not know your laughter,<br>
                I do not know the coffee you favor,<br>
                nor the rhythm of your silence,<br>
                nor the way your eyes drift when you're lost in thought.<br>
                <span style="display: block; margin: 8px 0;"></span>
                Still, something in me<br>
                reaches for the space you might have filled...
            </p>
            <p class="mb-2" style="font-style: italic; line-height: 1.8; font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 1.05rem; color: #555;">
                I do not know your days,<br>
                I do not know your laughter yet,<br>
                And still—<br>
                your absence feels familiar,<br>
                like a room I've only dreamed<br>
                but wake to missing.
            </p>
            <span style="position: absolute; bottom: -25px; right: 10px; font-size: 24px; color: #ff7e5f;">❞</span>
        </div>
    </div>
</div>
`;

// Create a variable for the May 16 piano content
const may16PianoContent = `
<div class="text-center mb-4 fade-in">
    <h3 class="mb-4" style="color: #4a6f8a; text-shadow: 1px 1px 3px rgba(0,0,0,0.1); font-family: 'Poppins', sans-serif; font-weight: 600;"> Smitten :) </h3>
    <div class="position-relative" style="max-width: 600px; margin: 0 auto;">
        <img src="static/images/piano.jpeg" class="img-fluid rounded shadow mb-4" alt="Piano Keys" style="max-height: 600px;">
    </div>
    <div class="audio-player-container p-4 mb-4" style="background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,248,255,0.9) 100%); border-radius: 16px; box-shadow: 0 12px 30px rgba(0,0,0,0.15); max-width: 600px; margin: 0 auto; border-left: 4px solid #4a6f8a; position: relative; overflow: hidden; transition: all 0.3s ease;">
        <!-- Decorative musical notes -->
        <div style="position: absolute; top: 10px; left: 10px; font-size: 16px; opacity: 0.4; transform: rotate(-15deg);">🎵</div>
        <div style="position: absolute; bottom: 15px; right: 15px; font-size: 18px; opacity: 0.4; transform: rotate(10deg);">🎶</div>
        
        <!-- Audio player title with icon -->
      
        
        <!-- Custom styled audio player -->
        <div style="background: linear-gradient(135deg, #ebf5fc 0%, #dceeff 100%); border-radius: 12px; padding: 18px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.1), 0 4px 15px rgba(0,0,0,0.08); position: relative; transition: all 0.3s ease;" 
             onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='inset 0 1px 3px rgba(0,0,0,0.1), 0 8px 20px rgba(0,0,0,0.12)';" 
             onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='inset 0 1px 3px rgba(0,0,0,0.1), 0 4px 15px rgba(0,0,0,0.08)';">
            
            <!-- Large play button that controls the audio -->
            <div class="position-absolute" style="top: 50%; left: 50%; transform: translate(-50%, -95%); z-index: 10; cursor: pointer; width: 50px; height: 50px; background: linear-gradient(135deg, #4a6f8a, #3a5d74); border-radius: 50%; box-shadow: 0 4px 10px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; opacity: 0; transition: all 0.3s ease; pointer-events: none;"
                 id="customPlayButton">
                <div style="width: 0; height: 0; border-style: solid; border-width: 10px 0 10px 16px; border-color: transparent transparent transparent #ffffff; margin-left: 4px;"></div>
            </div>
            
            <audio controls class="w-100" style="border-radius: 8px; height: 40px; position: relative; z-index: 5;" id="audioPlayer">
                <source src="static/audio/dooriyan.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            
            <!-- Custom wave visualization design element -->
            <div class="d-flex justify-content-between mt-3" style="height: 20px;">
                <div class="sound-wave" style="display: flex; align-items: flex-end; width: 100%; gap: 3px;">
                    <div style="width: 3px; height: 12px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 18px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 7px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 15px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 10px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 18px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 20px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 14px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 9px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 19px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 8px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 15px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 6px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 17px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 22px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 9px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 14px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 20px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 12px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                    <div style="width: 3px; height: 8px; background: linear-gradient(to top, #4a6f8a, #8ab0c1); border-radius: 3px;"></div>
                </div>
            </div>
        </div>
        
    </div>
</div>
`;

// Daily content data
const dailyContent = {
    // May 2025 entries
    '2025-05-13': {
        type: 'image',
        content: may13Content
    },
    
    // Make sure it works for the current year as well
    [(new Date().getFullYear()) + '-05-13']: {
        type: 'image',
        content: may13Content
    },
    
    // Additional format to ensure it works with all date formats
    '05-13': {
        type: 'image',
        content: may13Content
    },
    
    '2025-05-14': {
        type: 'image',
        content: may14FlowerContent
    },
    
    '2025-05-15': {
        type: 'poem',
        content: may15PoemContent
    },
    
    '2025-05-16': {
        type: 'image',
        content: may16PianoContent
    },
    
    // June 2025 example content
    // Format is 'YYYY-MM-DD': { type: 'note|song', content: '...' }
    
    /* Comment out the current date to avoid conflicts
    // Current date with Spotify embed
    [new Date().toISOString().split('T')[0]]: {
        type: 'song',
        content: '<div class="text-center mb-3"><h4>Today\'s Special Song</h4></div><iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/4TobDQpylJNxkXMH1QUvTp?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe><p class="mt-3">Enjoy this special song for today!</p>'
    },
    */
    
    // Example song embeds
    '2025-06-01': {
        type: 'song',
        content: '<div class="text-center mb-3"><h4>Summertime Anticipation</h4></div><iframe width="100%" height="315" src="https://www.youtube.com/embed/f5omECqDrQM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><p class="mt-3">Kick off June with this summer classic! What are you looking forward to most this summer?</p>'
    },
    
    '2025-06-05': {
        type: 'song',
        content: '<div class="text-center mb-3"><h4>Midweek Pick-Me-Up</h4></div><iframe src="https://open.spotify.com/embed/track/6nek1Nin9q48AVZcWs9e9D" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe><p class="mt-3">A perfect song to boost your energy through the rest of the week!</p>'
    },
    
    '2025-06-10': {
        type: 'song',
        content: '<div class="text-center mb-3"><h4>Countdown: 11 Days Left!</h4></div><iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/571035771&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><p class="mt-3">Getting closer to our special day. How are you preparing?</p>'
    },
    
    // Example notes and reflections
    '2025-06-03': {
        type: 'note',
        content: '<div class="alert alert-info p-4"><h4 class="text-center mb-3">18 Days Until June 21st</h4><p>Time for some reflection: What have you accomplished so far this year? What do you hope to achieve by June 21st?</p><p>Write down three goals you want to complete before summer officially begins:</p><ol><li>_____________________</li><li>_____________________</li><li>_____________________</li></ol></div>'
    },
    
    '2025-06-07': {
        type: 'note',
        content: '<div class="alert alert-warning p-4"><h4 class="text-center mb-3">Two Weeks To Go!</h4><p>Today is a good day to start planning how you\'ll celebrate the summer solstice on June 21st.</p><p>Some traditional ways people celebrate:</p><ul><li>Watch the sunrise or sunset</li><li>Have a bonfire with friends</li><li>Create a flower crown</li><li>Go for a hike or spend time in nature</li><li>Have a picnic</li></ul><p class="mt-3">What will your tradition be?</p></div>'
    },
    
    '2025-06-15': {
        type: 'note',
        content: '<div class="card"><div class="card-header bg-primary text-white"><h4 class="text-center m-0">Less than a week to go!</h4></div><div class="card-body"><p>The summer solstice is the longest day of the year in the Northern Hemisphere. On June 21st, we\'ll experience the maximum amount of daylight.</p><p>Did you know? The word "solstice" comes from the Latin words "sol" (sun) and "sistere" (to stand still) because the sun appears to pause before reversing direction.</p><div class="text-center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Earth-lighting-summer-solstice_EN.png/640px-Earth-lighting-summer-solstice_EN.png" class="img-fluid rounded mt-3" alt="Summer Solstice Diagram"></div></div></div>'
    },
    
    '2025-06-20': {
        type: 'note',
        content: '<div class="alert alert-success p-4"><h4 class="text-center mb-3">Eve of the Solstice</h4><p>Tomorrow is the big day! The summer solstice marks the official start of summer and the longest day of the year.</p><p>Tonight is the perfect time to set your intentions for the season ahead.</p><p>Take a moment to write down what you want this summer to mean for you:</p><textarea class="form-control mt-3 mb-3" rows="4" placeholder="My summer intentions..."></textarea><p class="font-italic">See you tomorrow for the celebration!</p></div>'
    },
    
    '2025-06-21': {
        type: 'celebration',
        content: '<div class="text-center"><h3 class="mb-4">🌞 Happy Summer Solstice! 🌞</h3><p class="lead">Today marks the official start of summer and the longest day of the year!</p><div class="my-4"><img src="https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" class="img-fluid rounded" alt="Summer Celebration"></div><p>Take time today to enjoy the abundance of sunlight, connect with nature, and celebrate the season of growth and vitality.</p><div class="mt-4 mb-3"><iframe width="100%" height="315" src="https://www.youtube.com/embed/u4XJ9xejgOA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><p>Here\'s to a beautiful, joy-filled summer ahead!</p></div>'
    }
};

// Get content for a specific day
function getDailyContent(dateStr) {
    console.log('Getting content for date:', dateStr); // Debug log
    
    // Special handling for May 13th
    if (dateStr.endsWith('-05-13') || dateStr === '05-13') {
        console.log('Special handling for May 13th');
        return dailyContent['2025-05-13'].content;
    }
    
    // Special handling for May 14
    if (dateStr.endsWith('-05-14') || dateStr === '05-14') {
        console.log('Special handling for May 14');
        return dailyContent['2025-05-14'].content;
    }
    
    // Special handling for May 15 - Poem
    if (dateStr.endsWith('-05-15') || dateStr === '05-15') {
        console.log('Special handling for May 15 - Poem');
        return dailyContent['2025-05-15'].content;
    }
    
    // Special handling for May 16 - Piano
    if (dateStr.endsWith('-05-16') || dateStr === '05-16') {
        console.log('Special handling for May 16 - Piano');
        return dailyContent['2025-05-16'].content;
    }
    
    // Special handling for June 3rd - Birthday
    if (dateStr.endsWith('-06-03') || dateStr === '06-03') {
        console.log('Special handling for June 3rd - Birthday');
        return dailyContent['2025-06-03'].content;
    }
    
    // Special handling for June 21st - Dreamy
    if (dateStr.endsWith('-06-21') || dateStr === '06-21') {
        console.log('Special handling for June 21st - Dreamy');
        return dailyContent['2025-06-21'].content;
    }
    
    // If we have content for this specific day, return it
    if (dailyContent[dateStr]) {
        console.log('Found exact match for date:', dateStr);
        return dailyContent[dateStr].content;
    }
    
    // Check for month-day only format (MM-DD)
    const dateParts = dateStr.split('-');
    if (dateParts.length === 3) {
        const monthDay = `${dateParts[1]}-${dateParts[2]}`;
        if (dailyContent[monthDay]) {
            console.log('Found match for month-day:', monthDay);
            return dailyContent[monthDay].content;
        }
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
    // Specific handling for May 13th - Gaming night theme
    if (date.getMonth() === 4 && date.getDate() === 13) {
        element.classList.add('gaming-date');
        element.setAttribute('title', 'Sleepless night jamming!');
        // Only make it interactive if it's today or in the past
        if (date <= currentDate || CONFIG.STAGING === "1") {
            element.addEventListener('click', function(event) {
                // Ensure we use the correct date for May 13
                const may13Date = `${date.getFullYear()}-05-13`;
                console.log('Special May 13 clicked with date:', may13Date);
                
                // Create a custom event object with the correct date
                const customEvent = {
                    currentTarget: {
                        getAttribute: function() {
                            return may13Date;
                        }
                    }
                };
                
                openDayModal(customEvent);
            });
        } else {
            // If it's in the future and not in staging mode, show future message
            element.addEventListener('click', function(event) {
                showFutureDateMessage(date);
            });
        }
        return;
    }
    
    // Specific handling for May 14th
    if (date.getMonth() === 4 && date.getDate() === 14) {
        element.classList.add('special-date');
        // Only make it interactive if it's today or in the past
        if (date <= currentDate || CONFIG.STAGING === "1") {
            element.addEventListener('click', function(event) {
                // Ensure we use the correct date for May 14
                const may14Date = `${date.getFullYear()}-05-14`;
                console.log('Special May 14 clicked with date:', may14Date);
                
                // Create a custom event object with the correct date
                const customEvent = {
                    currentTarget: {
                        getAttribute: function() {
                            return may14Date;
                        }
                    }
                };
                
                openDayModal(customEvent);
            });
        } else {
            // If it's in the future and not in staging mode, show future message
            element.addEventListener('click', function(event) {
                showFutureDateMessage(date);
            });
        }
        return;
    }
    
    // Specific handling for May 15th - Poem date
    if (date.getMonth() === 4 && date.getDate() === 15) {
        element.classList.add('poem-date');
        element.setAttribute('title', 'A beautiful poem awaits!');
        
        // Add cute badge background
        const badgeBackground = document.createElement('div');
        badgeBackground.style.position = 'absolute';
        badgeBackground.style.top = '-8px';
        badgeBackground.style.right = '-8px';
        badgeBackground.style.width = '30px';
        badgeBackground.style.height = '30px';
        badgeBackground.style.background = 'rgba(255,255,255,0.85)';
        badgeBackground.style.borderRadius = '50%';
        badgeBackground.style.boxShadow = '0 2px 5px rgba(0,0,0,0.15)';
        badgeBackground.style.display = 'flex';
        badgeBackground.style.alignItems = 'center';
        badgeBackground.style.justifyContent = 'center';
        badgeBackground.style.zIndex = '2';
        
        // Create a single combined icon
        const combinedIcon = document.createElement('div');
        combinedIcon.style.position = 'relative';
        combinedIcon.style.width = '18px';
        combinedIcon.style.height = '18px';
        
        // Add book icon
        const bookIcon = document.createElement('span');
        bookIcon.innerHTML = '📚';
        bookIcon.className = 'book-icon';
        bookIcon.style.fontSize = '12px';
        bookIcon.style.position = 'absolute';
        bookIcon.style.bottom = '-1px';
        bookIcon.style.left = '0px';
        bookIcon.style.filter = 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))';
        bookIcon.style.transform = 'rotate(-10deg)';
        bookIcon.style.zIndex = '2';
        
        // Add pen icon
        const penIcon = document.createElement('span');
        penIcon.innerHTML = '✒️';
        penIcon.className = 'poem-icon';
        penIcon.style.fontSize = '12px';
        penIcon.style.position = 'absolute';
        penIcon.style.top = '-3px';
        penIcon.style.right = '-2px';
        penIcon.style.filter = 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))';
        penIcon.style.transform = 'rotate(30deg)';
        penIcon.style.zIndex = '3';
        
        // Add icons to container
        combinedIcon.appendChild(bookIcon);
        combinedIcon.appendChild(penIcon);
        badgeBackground.appendChild(combinedIcon);
        
        // Position elements properly
        element.style.position = 'relative';
        element.appendChild(badgeBackground);
        
        // Add a cute pastel background with sparkle effect
        element.style.background = 'linear-gradient(135deg, #f8e2ff 0%, #ecd1ff 100%)';
        element.style.color = '#8440a1';
        element.style.fontWeight = '600';
        element.style.boxShadow = '0 4px 10px rgba(158, 79, 192, 0.2)';
        
        // Add sparkle animations using pseudo-elements via a class
        element.classList.add('sparkle-effect');
        
        // Add subtle animation
        element.style.transition = 'all 0.3s ease';
        combinedIcon.style.transition = 'all 0.3s ease';
        
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
            combinedIcon.style.transform = 'scale(1.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0)';
            combinedIcon.style.transform = 'scale(1)';
        });
        
        // Only make it interactive if it's today or in the past
        if (date <= currentDate || CONFIG.STAGING === "1") {
            element.addEventListener('click', function(event) {
                // Ensure we use the correct date for May 15
                const may15Date = `${date.getFullYear()}-05-15`;
                console.log('Special May 15 clicked with date:', may15Date);
                
                // Create a custom event object with the correct date
                const customEvent = {
                    currentTarget: {
                        getAttribute: function() {
                            return may15Date;
                        }
                    }
                };
                
                openDayModal(customEvent);
            });
        } else {
            // If it's in the future and not in staging mode, show future message
            element.addEventListener('click', function(event) {
                showFutureDateMessage(date);
            });
        }
        return;
    }
    
    // Specific handling for May 16th - Piano date
    if (date.getMonth() === 4 && date.getDate() === 16) {
        element.classList.add('piano-date');
        element.setAttribute('title', 'Smitten :)');
        
        // Add piano icon
        const pianoIcon = document.createElement('span');
        pianoIcon.innerHTML = '🎹';
        pianoIcon.style.position = 'absolute';
        pianoIcon.style.top = '-8px';
        pianoIcon.style.right = '-8px';
        pianoIcon.style.fontSize = '16px';
        pianoIcon.style.filter = 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))';
        pianoIcon.style.zIndex = '2';
        pianoIcon.style.background = 'rgba(255,255,255,0.9)';
        pianoIcon.style.borderRadius = '50%';
        pianoIcon.style.width = '25px';
        pianoIcon.style.height = '25px';
        pianoIcon.style.display = 'flex';
        pianoIcon.style.alignItems = 'center';
        pianoIcon.style.justifyContent = 'center';
        pianoIcon.style.boxShadow = '0 2px 5px rgba(0,0,0,0.15)';
        
        // Position elements properly
        element.style.position = 'relative';
        element.appendChild(pianoIcon);
        
        // Add styling for the date element
        element.style.background = 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)';
        element.style.color = '#006064';
        element.style.fontWeight = '600';
        element.style.boxShadow = '0 4px 10px rgba(0, 172, 193, 0.2)';
        
        // Add subtle animation
        element.style.transition = 'all 0.3s ease';
        pianoIcon.style.transition = 'all 0.3s ease';
        
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            pianoIcon.style.transform = 'scale(1.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            pianoIcon.style.transform = 'scale(1)';
        });
        
        // Only make it interactive if it's today or in the past
        if (date <= currentDate || CONFIG.STAGING === "1") {
            element.addEventListener('click', function(event) {
                // Ensure we use the correct date for May 16
                const may16Date = `${date.getFullYear()}-05-16`;
                console.log('Special May 16 clicked with date:', may16Date);
                
                // Create a custom event object with the correct date
                const customEvent = {
                    currentTarget: {
                        getAttribute: function() {
                            return may16Date;
                        }
                    }
                };
                
                openDayModal(customEvent);
            });
        } else {
            // If it's in the future and not in staging mode, show future message
            element.addEventListener('click', function(event) {
                showFutureDateMessage(date);
            });
        }
        return;
    }
    
    // In staging environment, all days are clickable to show their content
    if (CONFIG.STAGING === "1") {
        element.addEventListener('click', openDayModal);
        return;
    }
    
    // In production (STAGING = "0")
    // For past and present days, show actual content
    if (date <= currentDate) {
        element.addEventListener('click', openDayModal);
    } else {
        // For future dates in production, apply color classes and make clickable
        // but show future message instead of trying to load content
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
        
        // Make future dates clickable to show the future message
        element.addEventListener('click', function(event) {
            showFutureDateMessage(date);
        });
    }
}

// Show message for future dates in production environment
function showFutureDateMessage(date) {
    // Format the date for display in the modal title
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
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
        <div class="alert alert-${colorClass} text-center p-4 fade-in">
            <i class="fas ${iconClass} fa-3x mb-3"></i>
            <h4 class="mb-3">${formattedDate}</h4>
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

// Function to set up the audio player interaction
function setupAudioPlayerInteraction() {
    const audioPlayer = document.getElementById('audioPlayer');
    const customPlayBtn = document.getElementById('customPlayButton');
    const audioContainer = audioPlayer?.closest('div');
    
    if (!audioPlayer || !customPlayBtn || !audioContainer) return;
    
    // Show play button on hover
    audioContainer.addEventListener('mouseenter', function() {
        customPlayBtn.style.opacity = '0.9';
        customPlayBtn.style.transform = 'translate(-50%, -95%) scale(1.1)';
        customPlayBtn.style.pointerEvents = 'auto';
    });
    
    audioContainer.addEventListener('mouseleave', function() {
        customPlayBtn.style.opacity = '0';
        customPlayBtn.style.transform = 'translate(-50%, -95%) scale(1)';
        customPlayBtn.style.pointerEvents = 'none';
    });
    
    // Handle play/pause with the custom button
    customPlayBtn.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            // Change to pause symbol
            this.innerHTML = '<div style="width: 16px; height: 16px; background: white; border-radius: 2px;"></div>';
        } else {
            audioPlayer.pause();
            // Change back to play symbol
            this.innerHTML = '<div style="width: 0; height: 0; border-style: solid; border-width: 10px 0 10px 16px; border-color: transparent transparent transparent #ffffff; margin-left: 4px;"></div>';
        }
    });
    
    // Update button state when audio plays or pauses
    audioPlayer.addEventListener('play', function() {
        customPlayBtn.innerHTML = '<div style="width: 16px; height: 16px; background: white; border-radius: 2px;"></div>';
    });
    
    audioPlayer.addEventListener('pause', function() {
        customPlayBtn.innerHTML = '<div style="width: 0; height: 0; border-style: solid; border-width: 10px 0 10px 16px; border-color: transparent transparent transparent #ffffff; margin-left: 4px;"></div>';
    });
} 