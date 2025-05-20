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

// Create a variable for the May 17 question content
const may17QuestionContent = `
<div class="text-center mb-4 fade-in">
    
    
    <!-- Window UI Design -->
    <div id="question-window" class="window-container" style="max-width: 500px; margin: 0 auto; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.25); border: 1px solid rgba(0,0,0,0.1); position: relative;">
        <!-- Window title bar -->
        <div class="window-title-bar" style="background: linear-gradient(90deg, #7952b3 0%, #5d4a8a 100%); color: white; padding: 12px 15px; display: flex; justify-content: space-between; align-items: center;">
            <div class="window-title" style="font-weight: 600; display: flex; align-items: center;">
                <span style="font-size: 16px; margin-right: 8px;">❓</span>
                Important Question
            </div>
            <div class="window-controls">
                <span style="display: inline-block; width: 12px; height: 12px; background-color: #ff5f57; border-radius: 50%; margin-left: 6px;"></span>
                <span style="display: inline-block; width: 12px; height: 12px; background-color: #ffbd2e; border-radius: 50%; margin-left: 6px;"></span>
                <span style="display: inline-block; width: 12px; height: 12px; background-color: #28c940; border-radius: 50%; margin-left: 6px;"></span>
            </div>
        </div>
        
        <!-- Window content -->
        <div class="window-content p-4" style="padding: 25px;">
            <div class="question-container text-center">
                <h4 style="font-size: 1.5rem; margin-bottom: 20px; color: #5d4a8a;">Make a choice</h4>
                
                <!-- Hearts overlay for the entire screen -->
                <div id="screen-hearts-container" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999;"></div>
                
                <div id="options-container" class="options-container" style="display: flex; flex-direction: column; gap: 15px; max-width: 300px; margin: 0 auto; position: relative; height: 170px; overflow: visible;">
                    <!-- Option A - Amir -->
                    <div id="amir-container" style="position: relative; z-index: 5; overflow: visible;">
                        <button id="option-amir" class="option-button" 
                            onmouseenter="this.style.borderColor='#ff85c0'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(214, 51, 132, 0.2)'; this.style.background='rgba(255, 228, 247, 0.5)'; for(let i=0; i<15; i++) {setTimeout(function(){createFloatingHeart();}, i*100);}"
                            onmouseleave="this.style.borderColor='#e9ecef'; this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.05)'; this.style.background='white';"
                            onclick="document.getElementById('wise-lady-banner').style.opacity='1'; setTimeout(function(){document.getElementById('wise-lady-banner').style.opacity='0';}, 3000); createHeartExplosion(); document.getElementById('answer-text').innerHTML='Great choice! Amir is flattered! ❤️'; document.getElementById('answer-display').style.opacity='1'; this.style.borderColor='#7952b3'; this.style.backgroundColor='rgba(121, 82, 179, 0.1)';"
                            style="padding: 15px; width: 100%; background: white; border: 2px solid #e9ecef; border-radius: 10px; cursor: pointer; transition: all 0.3s ease; font-size: 1.1rem; font-weight: 500; box-shadow: 0 4px 6px rgba(0,0,0,0.05); position: relative;">
                            A) Amir
                        </button>
                    </div>
                    
                    <!-- Option B - Coffee (the text will run away) -->
                    <div id="coffee-container" style="position: absolute; top: 80px; left: 0; width: 100%; z-index: 2;">
                        <button id="option-coffee" class="option-button"
                            onmouseenter="this.style.backgroundColor='#fff8e1'; this.style.borderColor='#ffca28'; this.style.boxShadow='0 8px 16px rgba(255, 152, 0, 0.2)'; this.style.transform='translateY(-3px)'; this.querySelector('#coffee-text').style.fontWeight='bold'; this.querySelector('#coffee-text').style.color='#d84315';"
                            onmouseleave="this.style.backgroundColor='white'; this.style.borderColor='#e9ecef'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.05)'; this.style.transform='translateY(0)'; this.querySelector('#coffee-text').style.fontWeight='500'; this.querySelector('#coffee-text').style.color='initial';"
                            onclick="
                            // Simple movement approach - reset position first
                            this.parentNode.style.left = '0px';
                            this.parentNode.style.top = '80px';
                            this.parentNode.style.transform = 'none';
                            
                            // Count attempts
                            this.coffeeAttempts = (this.coffeeAttempts || 0) + 1;
                            document.getElementById('crying-face').style.opacity='1';
                            if(this.coffeeAttempts >= 3) document.getElementById('encouragement').style.opacity='1';
                            
                            // Now move the button (with simpler approach)
                            let randomX = Math.floor((Math.random() * 80) - 40);
                            let randomY = Math.floor((Math.random() * 60) - 30);
                            this.parentNode.style.left = randomX + 'px';
                            this.parentNode.style.top = (80 + randomY) + 'px';
                            
                            // Show broken hearts
                            const container = document.getElementById('screen-hearts-container');
                            if (container) {
                                // Clear previous hearts
                                container.innerHTML = '';
                                
                                // Create 15 broken hearts
                                for (let i = 0; i < 15; i++) {
                                    const delay = i * 100;
                                    setTimeout(function() {
                                        const heart = document.createElement('div');
                                        heart.textContent = '💔';
                                        heart.style.position = 'absolute';
                                        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
                                        heart.style.opacity = '0';
                                        heart.style.zIndex = '10000';
                                        heart.style.pointerEvents = 'none';
                                        heart.style.left = (50 + (Math.random() * 30 - 15)) + '%';
                                        heart.style.top = (50 + (Math.random() * 30 - 15)) + '%';
                                        container.appendChild(heart);
                                        
                                        // Animate heart
                                        setTimeout(function() {
                                            heart.style.transition = 'all 2s cubic-bezier(0.4, 0, 0.2, 1)';
                                            heart.style.opacity = '0.9';
                                            const randomRotate = (Math.random() * 40 - 20);
                                            const randomFall = (Math.random() * 30 + 20);
                                            heart.style.transform = 'translateY(' + randomFall + 'vh) rotate(' + randomRotate + 'deg)';
                                            
                                            // Fade out
                                            setTimeout(function() { heart.style.opacity = '0'; }, 1500);
                                            
                                            // Remove heart
                                            setTimeout(function() { 
                                                if (heart && heart.parentNode) heart.parentNode.removeChild(heart);
                                            }, 3000);
                                        }, 10);
                                    }, delay);
                                }
                            }
                            
                            // Show message directly
                            const answerDisplay = document.getElementById('answer-display');
                            const answerText = document.getElementById('answer-text');
                            if (answerDisplay && answerText) {
                                const messages = [
                                    'No',
                                    'Noooo',
                                    'Noooooooooooooooooo',
                                    'You should chose Amir.. not kidding.. this is Queen Coffee herself speaking',
                                    'Amir is the best choice.. I promise..',
                                    'Pakkka Promise..',
                                    
                                ];
                                
                                // Use simpler index tracking
                                if (!window.coffeeMessageIndex) window.coffeeMessageIndex = 0;
                                const currentMessage = messages[window.coffeeMessageIndex];
                                
                                // Increment counter for next time, reset if we reach the end
                                window.coffeeMessageIndex = (window.coffeeMessageIndex + 1) % messages.length;
                                
                                // Display the current message and make it visible permanently
                                answerText.innerHTML = currentMessage;
                                answerDisplay.style.opacity = '1';
                            }"
                            style="padding: 15px; width: 100%; background: white; border: 2px solid #e9ecef; border-radius: 10px; cursor: pointer; transition: all 0.3s ease; font-size: 1.1rem; font-weight: 500; box-shadow: 0 4px 6px rgba(0,0,0,0.05); position: relative; overflow: hidden;">
                            <span id="coffee-text" style="position: relative; transition: all 0.2s ease;">B) Coffee</span>
                        </button>
                        
                        <!-- Crying face - initially hidden -->
                        <div id="crying-face" style="position: absolute; top: 50%; right: 15px; transform: translateY(-50%); font-size: 1.2rem; opacity: 0; transition: opacity 0.3s ease;">😢</div>
                    </div>
                </div>
                
                <!-- Answer Display -->
                <div id="answer-display" class="mt-5" style="height: 80px; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s ease;">
                    <p id="answer-text" style="font-size: 1.2rem; color: #5d4a8a; background-color: rgba(121, 82, 179, 0.1); padding: 12px 20px; border-radius: 8px; margin: 0;"></p>
                </div>
                
                
                <!-- Wise Lady Message (initially hidden) -->
                <div id="wise-lady-banner" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255,228,247,0.9); color: #d63384; padding: 15px 30px; border-radius: 20px; font-weight: 600; font-size: 1.5rem; opacity: 0; transition: all 0.5s ease; white-space: nowrap; box-shadow: 0 5px 15px rgba(0,0,0,0.2); z-index: 10000; pointer-events: none;">
                    A Wise Lady Indeed! 💖
                </div>
            </div>
        </div>
    </div>
    
    <p class="mt-4 text-muted" style="font-style: italic;">Remember, Amir can learn to make coffee, but coffee can't learn to make an Amir</p>
</div>

<script>
// Direct inline functions that don't rely on complex event handling
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.textContent = ['❤️', '💖', '💕', '💓', '💗'][Math.floor(Math.random() * 5)];
    heart.style.position = 'absolute';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.opacity = '0';
    heart.style.zIndex = '10000';
    heart.style.pointerEvents = 'none';
    heart.style.left = (Math.random() * 100) + '%';
    heart.style.top = (Math.random() * 100) + '%';
    
    const container = document.getElementById('screen-hearts-container');
    if (container) container.appendChild(heart);
    
    setTimeout(function() {
        heart.style.transition = 'opacity 0.5s ease, transform ' + (Math.random() * 2 + 3) + 's ease-out';
        heart.style.opacity = '0.7';
        heart.style.transform = 'translateY(-' + (Math.random() * 30 + 20) + 'vh)';
    }, 10);
    
    setTimeout(function() {
        if (heart.parentNode) heart.parentNode.removeChild(heart);
    }, 5000);
}

// New function to show broken hearts when coffee is clicked
function showBrokenHearts() {
    const container = document.getElementById('screen-hearts-container');
    if (!container) return;
    
    // Create broken hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(function() {
            const heart = document.createElement('div');
            heart.textContent = '💔';
            heart.style.position = 'absolute';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.opacity = '0';
            heart.style.zIndex = '10000';
            heart.style.pointerEvents = 'none';
            
            // Position hearts around the coffee button area
            const coffeeButton = document.getElementById('option-coffee');
            if (coffeeButton) {
                const rect = coffeeButton.getBoundingClientRect();
                const centerX = (rect.left + rect.right) / 2;
                const centerY = (rect.top + rect.bottom) / 2;
                
                // Convert to percentage of viewport
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                const leftPercent = (centerX / viewportWidth * 100);
                const topPercent = (centerY / viewportHeight * 100);
                
                // Position around the center with some randomness
                heart.style.left = (leftPercent + (Math.random() * 30 - 15)) + '%';
                heart.style.top = (topPercent + (Math.random() * 30 - 15)) + '%';
            } else {
                // Fallback if button not found
                heart.style.left = (Math.random() * 100) + '%';
                heart.style.top = (Math.random() * 100) + '%';
            }
            
            container.appendChild(heart);
            
            // Animate falling and rotating broken hearts
            setTimeout(function() {
                heart.style.transition = 'all 2s cubic-bezier(0.4, 0, 0.2, 1)';
                heart.style.opacity = '0.9';
                const randomRotate = (Math.random() * 40 - 20);
                const randomFall = (Math.random() * 30 + 20);
                heart.style.transform = 'translateY(' + randomFall + 'vh) rotate(' + randomRotate + 'deg)';
                
                // Fade out
                setTimeout(function() {
                    heart.style.opacity = '0';
                }, 1500);
            }, 10);
            
            // Remove after animation
            setTimeout(function() {
                if (heart.parentNode) heart.parentNode.removeChild(heart);
            }, 3000);
        }, i * 100);
    }
}

// New function to show rejection messages when coffee is clicked
function showRejectionMessage() {
    const answerDisplay = document.getElementById('answer-display');
    const answerText = document.getElementById('answer-text');
    
    if (!answerDisplay || !answerText) return;
    
    // Array of rejection messages
    const messages = [
        "No. Choose Amir.",
        "No. Amir can keep you awake too.",
        "No. Choose Amir. Amir can be sweet too.",
        "No, bad choice!"
    ];
    
    // Select a random message
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Display the message
    answerText.innerHTML = randomMessage;
    answerDisplay.style.opacity = '1';
    
    // Hide the message after 3 seconds
    setTimeout(function() {
        answerDisplay.style.opacity = '0';
    }, 2000);
}

function createHeartExplosion() {
    const container = document.getElementById('screen-hearts-container');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        setTimeout(function() {
            const heart = document.createElement('div');
            heart.textContent = ['❤️', '💖', '💕', '💓', '💗'][Math.floor(Math.random() * 5)];
            heart.style.position = 'absolute';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.opacity = '0';
            heart.style.zIndex = '10000';
            heart.style.pointerEvents = 'none';
            heart.style.left = '50%';
            heart.style.top = '50%';
            
            container.appendChild(heart);
            
            setTimeout(function() {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 70 + 30;
                const xMovement = Math.cos(angle) * distance;
                const yMovement = Math.sin(angle) * distance;
                
                heart.style.transition = 'all 1.5s cubic-bezier(0.1, 0.8, 0.3, 1)';
                heart.style.opacity = '0.9';
                heart.style.transform = 'translate(' + xMovement + 'vw, ' + yMovement + 'vh)';
                
                setTimeout(function() {
                    heart.style.opacity = '0';
                }, 1000);
            }, 10);
            
            setTimeout(function() {
                if (heart.parentNode) heart.parentNode.removeChild(heart);
            }, 5000);
        }, i * 40);
    }
}

// Add a mousemove handler for the coffee button
document.addEventListener('DOMContentLoaded', function() {
    function handleCoffeeMouseMove(e) {
        const coffeeButton = document.getElementById('option-coffee');
        const coffeeContainer = document.getElementById('coffee-container');
        const coffeeText = document.getElementById('coffee-text');
        const cryingFace = document.getElementById('crying-face');
        const optionsContainer = document.getElementById('options-container');
        
        if (!coffeeButton || !coffeeContainer || !optionsContainer) return;
        
        const coffeeBtnRect = coffeeButton.getBoundingClientRect();
        const containerRect = optionsContainer.getBoundingClientRect();
        
        // Check if mouse is DIRECTLY over the coffee button (not just near it)
        if (
            e.clientX >= coffeeBtnRect.left && 
            e.clientX <= coffeeBtnRect.right && 
            e.clientY >= coffeeBtnRect.top && 
            e.clientY <= coffeeBtnRect.bottom
        ) {
            if (cryingFace) cryingFace.style.opacity = '1';
            
            if (coffeeText) {
                const mouseX = e.clientX;
                const coffeeTextRect = coffeeText.getBoundingClientRect();
                
                if (mouseX < (coffeeTextRect.left + coffeeTextRect.right) / 2) {
                    coffeeText.style.transform = 'translateX(40px)';
                } else {
                    coffeeText.style.transform = 'translateX(-40px)';
                }
            }
            
            const btnCenterX = (coffeeBtnRect.left + coffeeBtnRect.right) / 2 - containerRect.left;
            const btnCenterY = (coffeeBtnRect.top + coffeeBtnRect.bottom) / 2 - containerRect.top;
            
            const mouseContainerX = e.clientX - containerRect.left;
            const mouseContainerY = e.clientY - containerRect.top;
            
            const distX = btnCenterX - mouseContainerX;
            const distY = btnCenterY - mouseContainerY;
            
            // Always move the button when directly hovered (no magnitude check needed)
            const moveX = (distX / Math.max(Math.sqrt(distX*distX + distY*distY), 1)) * 80;
            const moveY = (distY / Math.max(Math.sqrt(distX*distX + distY*distY), 1)) * 40;
            
            const containerWidth = containerRect.width;
            const containerHeight = containerRect.height;
            const btnWidth = coffeeBtnRect.width;
            const btnHeight = coffeeBtnRect.height;
            
            let newLeft = btnCenterX + moveX - btnWidth/2;
            let newTop = btnCenterY + moveY - btnHeight/2;
            
            newLeft = Math.max(0, Math.min(containerWidth - btnWidth, newLeft));
            newTop = Math.max(60, Math.min(containerHeight - btnHeight, newTop));
            
            coffeeContainer.style.position = 'absolute';
            coffeeContainer.style.left = newLeft + 'px';
            coffeeContainer.style.top = newTop + 'px';
            coffeeContainer.style.transition = 'left 0.2s ease, top 0.2s ease';
            
            const tiltAngle = (Math.random() * 6) - 3;
            coffeeButton.style.transform = 'rotate(' + tiltAngle + 'deg)';
        } else {
            if (coffeeText) coffeeText.style.transform = 'translateX(0)';
            if (cryingFace) cryingFace.style.opacity = '0';
        }
    }
    
    // Apply the event handler to both document and modal content
    document.addEventListener('mousemove', handleCoffeeMouseMove);
    
    // Listen for modal shown events to set up handlers
    const modal = document.getElementById('dayModal');
    if (modal) {
        modal.addEventListener('shown.bs.modal', function() {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.addEventListener('mousemove', handleCoffeeMouseMove);
            }
        });
    }
});
</script>
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
    
    '2025-05-17': {
        type: 'interactive',
        content: may17QuestionContent
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
    },
    
    // Special handling for May 19 - Special Message
    '2025-05-19': {
        type: 'coupon',
        content: `
        <div class="text-center mb-4 fade-in">
            <div class="card border-0 shadow-sm">
                <div class="card-body p-4">
                    <div class="text-center mb-4" style="color: #d63384; font-style: italic; font-size: 1.5rem; font-weight: 600;">
                        <i class="fas fa-gift"></i> Your Special Coupons
                    </div>
                    
                    <div class="coupon-list" style="display: flex; flex-direction: column; gap: 25px; max-width: 500px; margin: 0 auto;">
                        <!-- Coupon 1 -->
                        <div class="coupon" style="border: 2px dashed #d63384; border-radius: 12px; padding: 20px; position: relative; background: linear-gradient(135deg, #fff0f7 0%, #ffebf4 100%); box-shadow: 0 4px 15px rgba(214, 51, 132, 0.15);">
                            <div style="position: absolute; top: -10px; right: -10px; background: #d63384; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">1</div>
                            <h4 style="color: #d63384; margin-bottom: 10px; font-weight: 600;">Come Meet Me</h4>
                            <p style="margin-bottom: 5px;">Valid for one in-person meeting. I'll make time for you.</p>
                            <p style="font-size: 0.85rem; font-style: italic; color: #86577d; margin-top: 15px;">No expiration date. Redeem when you're ready.</p>
                            <div style="border-top: 1px dashed #d63384; margin-top: 15px; padding-top: 10px; display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: 600;">CODE: AYAMMEET</span>
                                <span style="font-style: italic;">👋</span>
                            </div>
                        </div>
                        
                        <!-- Coupon 2 -->
                        <div class="coupon" style="border: 2px dashed #4361ee; border-radius: 12px; padding: 20px; position: relative; background: linear-gradient(135deg, #ebf4ff 0%, #e6f0ff 100%); box-shadow: 0 4px 15px rgba(67, 97, 238, 0.15);">
                            <div style="position: absolute; top: -10px; right: -10px; background: #4361ee; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">2</div>
                            <h4 style="color: #4361ee; margin-bottom: 10px; font-weight: 600;">Answer Me Something</h4>
                            <p style="margin-bottom: 5px;">Redeem for one honest answer to any question you want to ask.</p>
                            <p style="font-size: 0.85rem; font-style: italic; color: #3a56b4; margin-top: 15px;">No judgment, just honesty.</p>
                            <div style="border-top: 1px dashed #4361ee; margin-top: 15px; padding-top: 10px; display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: 600;">CODE: AYAMANS</span>
                                <span style="font-style: italic;">🔍</span>
                            </div>
                        </div>
                        
                        <!-- Coupon 3 -->
                        <div class="coupon" style="border: 2px dashed #38b000; border-radius: 12px; padding: 20px; position: relative; background: linear-gradient(135deg, #f0fff4 0%, #e8fae9 100%); box-shadow: 0 4px 15px rgba(56, 176, 0, 0.15);">
                            <div style="position: absolute; top: -10px; right: -10px; background: #38b000; color: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">3</div>
                            <h4 style="color: #38b000; margin-bottom: 10px; font-weight: 600;">Cheer Up Call</h4>
                            <p style="margin-bottom: 5px;">Instant mood booster when you're feeling down. Redeem for one call that will make you smile.</p>
                            <p style="font-size: 0.85rem; font-style: italic; color: #2d7900; margin-top: 15px;">We guarantee smiles or your coupon back!</p>
                            <div style="border-top: 1px dashed #38b000; margin-top: 15px; padding-top: 10px; display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: 600;">CODE: AYAMCALL</span>
                                <span style="font-style: italic;">😊</span>
                            </div>g
                        </div>
                    </div>
                    
                    <p class="mt-4" style="font-style: italic; color: #6b7280;">Cut along the dotted lines and redeem whenever you want!</p>
                </div>
            </div>
        </div>`
    },
    
    // May 20 - Google Form
    '2025-05-20': {
        type: 'form',
        content: `
        <div class="text-center mb-4 fade-in">
            <div class="card border-0 shadow-sm">
                <div class="card-body p-4">
                    <h3 class="mb-4" style="color: #5a67d8; font-weight: 600;">Take this test for Amir Elite Services</h3>
                    <p class="lead mb-4">Click the button below to open the form:</p>
                    
                    <a href="https://forms.gle/DmuGwdjGLZymbYoS7" target="_blank" class="btn btn-lg px-5 py-3" 
                       style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); color: white; font-weight: 600; 
                              border-radius: 50px; border: none; box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4); 
                              transition: all 0.3s ease; position: relative; overflow: hidden;">
                        <span style="position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; gap: 10px;">
                            <span>Let's know Ayrisha :)</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                            </svg>
                        </span>
                        <span style="position: absolute; top: 0; left: -100%; width: 200%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transform: skewX(-30deg); animation: shine 3s infinite;"></span>
                    </a>
                    
                    <p class="mt-4 text-muted">The form will open in a new tab.</p>
                </div>
            </div>
        </div>
        
        <style>
            @keyframes shine {
                0% { left: -100%; }
                20% { left: 100%; }
                100% { left: 100%; }
            }
        </style>`
    },
    
    // May 21 - Now with the song that was previously on May 22nd
    '2025-05-21': {
        type: 'song',
        content: `
        <div class="text-center mb-4 fade-in">
            <div class="card border-0 shadow-sm">
                <div class="card-body p-4">
                    <h3 class="mb-4" style="color: #1DB954; text-shadow: 1px 1px 3px rgba(0,0,0,0.1); font-family: 'Poppins', sans-serif; font-weight: 600;">I would want to be there for you :D</h3>
                    
                    <div class="position-relative" style="max-width: 600px; margin: 0 auto;">
                        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/37R0bQOQj5a7DOqh1TGzvB?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </div>
                   
                    <p class="mt-4" style="font-style: italic; color: #718096;"> :)</p>
                </div>
            </div>
        </div>`
    },
    
    // May 22 - Now with the song that was previously on May 21st
    '2025-05-22': {
        type: 'song',
        content: `
        <div class="text-center mb-4 fade-in">
            <div class="card border-0 shadow-sm">
                <div class="card-body p-4">
                    <h3 class="mb-4" style="color: #1DB954; text-shadow: 1px 1px 3px rgba(0,0,0,0.1); font-family: 'Poppins', sans-serif; font-weight: 600;">Knowing you has been like this One Direction song</h3>
                    
                    <div class="position-relative" style="max-width: 600px; margin: 0 auto;">
                        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/5G2c6FsfTzgYUzageCmfXY?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </div>
                    
                    
                </div>
            </div>
        </div>`
    },
    
    // Other entries
    // ... existing code ...
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
    
    // Special handling for May 17 - Question Window
    if (dateStr.endsWith('-05-17') || dateStr === '05-17') {
        console.log('Special handling for May 17 - Question Window');
        return dailyContent['2025-05-17'].content;
    }
    
    // Special handling for May 18 - Special Message
    if (dateStr.endsWith('-05-18') || dateStr === '05-18') {
        console.log('Special handling for May 18 - Special Message');
        const specialMessage = `
        <div class="text-center mb-4 fade-in">
            <div class="card border-0 shadow-sm">
                <div class="card-body p-4">
                
                    <div class="message-content" style="font-family: 'Georgia', serif; line-height: 1.7; color: #3a3a3a; background-color: #fffaf0; padding: 25px; border-radius: 10px; border-left: 4px solid #d63384;">
                        <p>Lately, I like the hours I am with you online. Those are the best minutes of my day. You brighten up my day! </p> 
                        <p> It takes a lot of courage to step into this(I know for you too). And you make it easy and welcoming. I appreciate all the efforts you put in, given that this is new for you. I know a few things would be overwhelming for you. I am grateful to you for handling it with such care.</p>

                        <p>I appreciate you being there, more than I can write here in these lines.</p>

                        <p>I cannot wait for what the future holds for us. I want to know how your mind will think about me, when you get to know me well. I want to know which part of me will annoy you and which part of me you will love and cherish. I hope that you like more parts of me than the ones you do not appreciate so much.</p>
                        
                        <p>Do not ever think you would bother me, overwhelm me, I like every text, call, reel, snap from you and only wish for more. </p>

                        <p>It's very easy to be fond of you for anyone. You must know it too. But I want you to know that I love your calm yet super-fun side, your attitude towards things, how you hold a conversation, how you can be super responsible and clumsy at the same time! Also, your voice is lovely :)</p>

                        <p>Whether or not you become a constant part of my life, you have affected me in many good ways. That's already a beautiful gift you have given me. Thank you! You are a cutie!</p>

                        <p>You do not need to respond to this. All I wanted was this to reach you. Bye.</p>
                    </div>
                    <div class="text-center mt-4">
                        <i class="fas fa-heart" style="color: #d63384; font-size: 24px;"></i>
                    </div>
                </div>
            </div>
        </div>`;
        return specialMessage;
    }
    
    // Special handling for May 19 - Special Message
    if (dateStr.endsWith('-05-19') || dateStr === '05-19') {
        console.log('Special handling for May 19 - Special Message');
        return dailyContent['2025-05-19'].content;
    }
    
    // Special handling for May 20 - Google Form
    if (dateStr.endsWith('-05-20') || dateStr === '05-20') {
        console.log('Special handling for May 20 - Google Form');
        return dailyContent['2025-05-20'].content;
    }
    
    // Special handling for May 21 - One Direction Spotify Song
    if (dateStr.endsWith('-05-21') || dateStr === '05-21') {
        console.log('Special handling for May 21 - One Direction Spotify Song');
        return dailyContent['2025-05-21'].content;
    }
    
    // Special handling for May 22 - Second Spotify Song
    if (dateStr.endsWith('-05-22') || dateStr === '05-22') {
        console.log('Special handling for May 22 - Second Spotify Song');
        return dailyContent['2025-05-22'].content;
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
    
    // Specific handling for May 17th - Question window
    if (date.getMonth() === 4 && date.getDate() === 17) {
        element.classList.add('question-date');
        element.setAttribute('title', 'An important question awaits');
        
        // Add window icon
        const windowIcon = document.createElement('span');
        windowIcon.innerHTML = '💬';
        windowIcon.style.position = 'absolute';
        windowIcon.style.top = '-8px';
        windowIcon.style.right = '-8px';
        windowIcon.style.fontSize = '16px';
        windowIcon.style.filter = 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))';
        windowIcon.style.zIndex = '2';
        windowIcon.style.background = 'rgba(255,255,255,0.9)';
        windowIcon.style.borderRadius = '50%';
        windowIcon.style.width = '25px';
        windowIcon.style.height = '25px';
        windowIcon.style.display = 'flex';
        windowIcon.style.alignItems = 'center';
        windowIcon.style.justifyContent = 'center';
        windowIcon.style.boxShadow = '0 2px 5px rgba(0,0,0,0.15)';
        
        // Position elements properly
        element.style.position = 'relative';
        element.appendChild(windowIcon);
        
        // Add styling for the date element
        element.style.background = 'linear-gradient(135deg, #e5dbfa 0%, #d7c6f8 100%)';
        element.style.color = '#5d4a8a';
        element.style.fontWeight = '600';
        element.style.boxShadow = '0 4px 10px rgba(93, 74, 138, 0.2)';
        
        // Add subtle animation
        element.style.transition = 'all 0.3s ease';
        windowIcon.style.transition = 'all 0.3s ease';
        
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            windowIcon.style.transform = 'scale(1.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            windowIcon.style.transform = 'scale(1)';
        });
        
        // Only make it interactive if it's today or in the past
        if (date <= currentDate || CONFIG.STAGING === "1") {
            element.addEventListener('click', function(event) {
                // Ensure we use the correct date for May 17
                const may17Date = `${date.getFullYear()}-05-17`;
                console.log('Special May 17 clicked with date:', may17Date);
                
                // Create a custom event object with the correct date
                const customEvent = {
                    currentTarget: {
                        getAttribute: function() {
                            return may17Date;
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
    
    // Specific handling for May 18th - Special Message
    if (date.getMonth() === 4 && date.getDate() === 18) {
        element.classList.add('message-date');
        element.setAttribute('title', 'A special message for you');
        
        // Add a heart badge to the day
        const heartBadge = document.createElement('div');
        heartBadge.style.position = 'absolute';
        heartBadge.style.top = '-8px';
        heartBadge.style.right = '-8px';
        heartBadge.style.width = '24px';
        heartBadge.style.height = '24px';
        heartBadge.style.background = 'rgba(255,255,255,0.9)';
        heartBadge.style.borderRadius = '50%';
        heartBadge.style.boxShadow = '0 2px 5px rgba(0,0,0,0.15)';
        heartBadge.style.display = 'flex';
        heartBadge.style.alignItems = 'center';
        heartBadge.style.justifyContent = 'center';
        heartBadge.style.zIndex = '2';
        heartBadge.innerHTML = '💌';
        heartBadge.style.fontSize = '12px';
        
        // Position elements properly
        element.style.position = 'relative';
        element.appendChild(heartBadge);
        
        // Soft styling for the day
        element.style.background = 'linear-gradient(135deg, #fff0f5 0%, #ffebee 100%)';
        element.style.color = '#d63384';
        element.style.fontWeight = '600';
        element.style.boxShadow = '0 4px 10px rgba(214, 51, 132, 0.15)';
        
        // Add hover effects
        element.style.transition = 'all 0.3s ease';
        heartBadge.style.transition = 'all 0.3s ease';
        
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            heartBadge.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            heartBadge.style.transform = 'scale(1) rotate(0)';
        });
        
        // Make it always interactive
        element.addEventListener('click', function(event) {
            // Ensure we use the correct date for May 18
            const may18Date = `${date.getFullYear()}-05-18`;
            console.log('Special May 18 clicked with date:', may18Date);
            
            // Create a custom event object
            const customEvent = {
                currentTarget: {
                    getAttribute: function() {
                        return may18Date;
                    }
                }
            };
            
            openDayModal(customEvent);
        });
        return;
    }
    
    // Specific handling for May 19th - Special Message
    if (date.getMonth() === 4 && date.getDate() === 19) {
        element.classList.add('message-date');
        element.setAttribute('title', 'Your Coupons');
        
        // Add a coupon badge to the day
        const couponBadge = document.createElement('div');
        couponBadge.style.position = 'absolute';
        couponBadge.style.top = '-8px';
        couponBadge.style.right = '-8px';
        couponBadge.style.width = '24px';
        couponBadge.style.height = '24px';
        couponBadge.style.background = 'rgba(255,255,255,0.9)';
        couponBadge.style.borderRadius = '50%';
        couponBadge.style.boxShadow = '0 2px 5px rgba(0,0,0,0.15)';
        couponBadge.style.display = 'flex';
        couponBadge.style.alignItems = 'center';
        couponBadge.style.justifyContent = 'center';
        couponBadge.style.zIndex = '2';
        couponBadge.innerHTML = '🎟️';
        couponBadge.style.fontSize = '12px';
        
        // Position elements properly
        element.style.position = 'relative';
        element.appendChild(couponBadge);
        
        // Soft styling for the day
        element.style.background = 'linear-gradient(135deg, #fff0f5 0%, #ffebee 100%)';
        element.style.color = '#d63384';
        element.style.fontWeight = '600';
        element.style.boxShadow = '0 4px 10px rgba(214, 51, 132, 0.15)';
        
        // Add hover effects
        element.style.transition = 'all 0.3s ease';
        couponBadge.style.transition = 'all 0.3s ease';
        
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            couponBadge.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            couponBadge.style.transform = 'scale(1) rotate(0)';
        });
        
        // Follow the same rules as other dates (instead of always being interactive)
        // In staging environment or if date is in past/present, show actual content
        if (CONFIG.STAGING === "1" || date <= currentDate) {
            element.addEventListener('click', function(event) {
                // Ensure we use the correct date for May 19
                const may19Date = `${date.getFullYear()}-05-19`;
                console.log('Special May 19 clicked with date:', may19Date);
                
                // Create a custom event object
                const customEvent = {
                    currentTarget: {
                        getAttribute: function() {
                            return may19Date;
                        }
                    }
                };
                
                openDayModal(customEvent);
            });
        } else {
            // For future dates in production, show future message
            element.addEventListener('click', function(event) {
                showFutureDateMessage(date);
            });
        }
        return;
    }
    
    // Specific handling for May 20th - Google Form
    if (date.getMonth() === 4 && date.getDate() === 20) {
        element.classList.add('form-date');
        element.setAttribute('title', 'Special Google Form');
        
        // Add form icon
        const formIcon = document.createElement('span');
        formIcon.innerHTML = '📝';
        formIcon.style.position = 'absolute';
        formIcon.style.top = '-8px';
        formIcon.style.right = '-8px';
        formIcon.style.fontSize = '16px';
        formIcon.style.filter = 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))';
        formIcon.style.zIndex = '2';
        formIcon.style.background = 'rgba(255,255,255,0.9)';
        formIcon.style.borderRadius = '50%';
        formIcon.style.width = '25px';
        formIcon.style.height = '25px';
        formIcon.style.display = 'flex';
        formIcon.style.alignItems = 'center';
        formIcon.style.justifyContent = 'center';
        formIcon.style.boxShadow = '0 2px 5px rgba(0,0,0,0.15)';
        
        // Position elements properly
        element.style.position = 'relative';
        element.appendChild(formIcon);
        
        // Add styling for the date element
        element.style.background = 'linear-gradient(135deg, #ebf8ff 0%, #d6f0ff 100%)';
        element.style.color = '#3182ce';
        element.style.fontWeight = '600';
        element.style.boxShadow = '0 4px 10px rgba(49, 130, 206, 0.2)';
        
        // Add subtle animation
        element.style.transition = 'all 0.3s ease';
        formIcon.style.transition = 'all 0.3s ease';
        
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            formIcon.style.transform = 'scale(1.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            formIcon.style.transform = 'scale(1)';
        });
        
        // Follow the same rules as other dates
        // In staging environment or if date is in past/present, show actual content
        if (CONFIG.STAGING === "1" || date <= currentDate) {
            element.addEventListener('click', function(event) {
                // Ensure we use the correct date for May 20
                const may20Date = `${date.getFullYear()}-05-20`;
                console.log('Special May 20 clicked with date:', may20Date);
                
                // Create a custom event object
                const customEvent = {
                    currentTarget: {
                        getAttribute: function() {
                            return may20Date;
                        }
                    }
                };
                
                openDayModal(customEvent);
            });
        } else {
            // For future dates in production, show future message
            element.addEventListener('click', function(event) {
                showFutureDateMessage(date);
            });
        }
        return;
    }
    
    // Specific handling for May 21st - One Direction Spotify Song
    if (date.getMonth() === 4 && date.getDate() === 21) {
        element.classList.add('spotify-date');
        element.setAttribute('title', 'Special song for today');
        
        // Add Spotify icon
        const spotifyIcon = document.createElement('span');
        spotifyIcon.innerHTML = '🎵';
        spotifyIcon.style.position = 'absolute';
        spotifyIcon.style.top = '-8px';
        spotifyIcon.style.right = '-8px';
        spotifyIcon.style.fontSize = '16px';
        spotifyIcon.style.filter = 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))';
        spotifyIcon.style.zIndex = '2';
        spotifyIcon.style.background = 'rgba(255,255,255,0.9)';
        spotifyIcon.style.borderRadius = '50%';
        spotifyIcon.style.width = '25px';
        spotifyIcon.style.height = '25px';
        spotifyIcon.style.display = 'flex';
        spotifyIcon.style.alignItems = 'center';
        spotifyIcon.style.justifyContent = 'center';
        spotifyIcon.style.boxShadow = '0 2px 5px rgba(0,0,0,0.15)';
        
        // Position elements properly
        element.style.position = 'relative';
        element.appendChild(spotifyIcon);
        
        // Add styling for the date element - Spotify green gradient
        element.style.background = 'linear-gradient(135deg, #1DB954 0%, #1ed760 100%)';
        element.style.color = 'white';
        element.style.fontWeight = '600';
        element.style.boxShadow = '0 4px 10px rgba(29, 185, 84, 0.3)';
        
        // Add subtle animation
        element.style.transition = 'all 0.3s ease';
        spotifyIcon.style.transition = 'all 0.3s ease';
        
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            spotifyIcon.style.transform = 'scale(1.2) rotate(15deg)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            spotifyIcon.style.transform = 'scale(1) rotate(0)';
        });
        
        // Follow the same rules as other dates
        // In staging environment or if date is in past/present, show actual content
        if (CONFIG.STAGING === "1" || date <= currentDate) {
            element.addEventListener('click', function(event) {
                // Ensure we use the correct date for May 21
                const may21Date = `${date.getFullYear()}-05-21`;
                console.log('Special May 21 clicked with date:', may21Date);
                
                // Create a custom event object
                const customEvent = {
                    currentTarget: {
                        getAttribute: function() {
                            return may21Date;
                        }
                    }
                };
                
                openDayModal(customEvent);
            });
        } else {
            // For future dates in production, show future message
            element.addEventListener('click', function(event) {
                showFutureDateMessage(date);
            });
        }
        return;
    }
    
    // Specific handling for May 22nd - Second Spotify Song
    if (date.getMonth() === 4 && date.getDate() === 22) {
        element.classList.add('spotify-date-alt');
        element.setAttribute('title', 'Special song just for you');
        
        // Add Spotify icon with slight variation
        const spotifyIcon = document.createElement('span');
        spotifyIcon.innerHTML = '🎵';
        spotifyIcon.style.position = 'absolute';
        spotifyIcon.style.top = '-8px';
        spotifyIcon.style.right = '-8px';
        spotifyIcon.style.fontSize = '16px';
        spotifyIcon.style.filter = 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))';
        spotifyIcon.style.zIndex = '2';
        spotifyIcon.style.background = 'rgba(255,255,255,0.9)';
        spotifyIcon.style.borderRadius = '50%';
        spotifyIcon.style.width = '25px';
        spotifyIcon.style.height = '25px';
        spotifyIcon.style.display = 'flex';
        spotifyIcon.style.alignItems = 'center';
        spotifyIcon.style.justifyContent = 'center';
        spotifyIcon.style.boxShadow = '0 2px 5px rgba(0,0,0,0.15)';
        
        // Position elements properly
        element.style.position = 'relative';
        element.appendChild(spotifyIcon);
        
        // Add styling for the date element - Purple gradient (different from May 21)
        element.style.background = 'linear-gradient(135deg, #6A0DAD 0%, #8A2BE2 100%)';
        element.style.color = 'white';
        element.style.fontWeight = '600';
        element.style.boxShadow = '0 4px 10px rgba(106, 13, 173, 0.3)';
        
        // Add subtle animation
        element.style.transition = 'all 0.3s ease';
        spotifyIcon.style.transition = 'all 0.3s ease';
        
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            spotifyIcon.style.transform = 'scale(1.2) rotate(-15deg)'; // Different rotation
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            spotifyIcon.style.transform = 'scale(1) rotate(0)';
        });
        
        // Follow the same rules as other dates
        // In staging environment or if date is in past/present, show actual content
        if (CONFIG.STAGING === "1" || date <= currentDate) {
            element.addEventListener('click', function(event) {
                // Ensure we use the correct date for May 22
                const may22Date = `${date.getFullYear()}-05-22`;
                console.log('Special May 22 clicked with date:', may22Date);
                
                // Create a custom event object
                const customEvent = {
                    currentTarget: {
                        getAttribute: function() {
                            return may22Date;
                        }
                    }
                };
                
                openDayModal(customEvent);
            });
        } else {
            // For future dates in production, show future message
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