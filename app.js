// ACH Window Data
const achData = {
  "same_day_windows": [
    {
      "name": "Same Day Window 1",
      "submission_deadline": "10:30",
      "settlement_time": "13:00",
      "description": "Morning same-day processing window"
    },
    {
      "name": "Same Day Window 2",
      "submission_deadline": "14:45",
      "settlement_time": "17:00",
      "description": "Afternoon same-day processing window"
    },
    {
      "name": "Same Day Window 3",
      "submission_deadline": "16:45",
      "settlement_time": "18:00",
      "description": "Late afternoon same-day processing window"
    }
  ],
  "next_day_windows": [
    {
      "name": "Overnight Window",
      "submission_deadline": "02:15",
      "settlement_time": "08:30",
      "description": "Early morning next-day processing window",
      "settlement_day": "+1"
    },
    {
      "name": "Evening Window",
      "submission_deadline": "20:00",
      "settlement_time": "08:30",
      "description": "Evening next-day processing window (Sun-Thu only)",
      "settlement_day": "+1",
      "days_restriction": "Sunday through Thursday only"
    },
    {
      "name": "Late Evening Window",
      "submission_deadline": "22:45",
      "settlement_time": "08:30",
      "description": "Late evening next-day processing window",
      "settlement_day": "+1"
    }
  ],
  "timezones": {
    "UTC": {"offset": 4, "name": "Coordinated Universal Time"},
    "Denver": {"offset": -2, "name": "Mountain Daylight Time (MDT)"},
    "ET": {"offset": 0, "name": "Eastern Daylight Time (EDT)"},
    "Lisbon": {"offset": 5, "name": "Western European Summer Time (WEST)"}
  }
};

// Timezone conversion helper
function convertTime(timeStr, fromOffset = 0, toOffset = 0) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  let convertedHours = hours + (toOffset - fromOffset);
  
  // Handle day rollover
  if (convertedHours >= 24) {
    convertedHours -= 24;
  } else if (convertedHours < 0) {
    convertedHours += 24;
  }
  
  return `${convertedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Get next business day
function getNextBusinessDay(date) {
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);
  
  // Skip weekends
  if (nextDay.getDay() === 0) { // Sunday
    nextDay.setDate(nextDay.getDate() + 1);
  } else if (nextDay.getDay() === 6) { // Saturday
    nextDay.setDate(nextDay.getDate() + 2);
  }
  
  return nextDay;
}

// Check if current day allows Evening Window (Sun-Thu)
function isEveningWindowDay(date) {
  const day = date.getDay();
  return day >= 0 && day <= 4; // Sunday (0) through Thursday (4)
}

// Get next deadline for a window
function getNextDeadline(timeStr, isNextDay = false, hasRestriction = false) {
  const now = new Date();
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  let deadline = new Date(now);
  deadline.setHours(hours, minutes, 0, 0);
  
  // If deadline has passed today, move to next occurrence
  if (deadline <= now) {
    if (isNextDay) {
      deadline = getNextBusinessDay(deadline);
      deadline.setHours(hours, minutes, 0, 0);
    } else {
      deadline = getNextBusinessDay(deadline);
      deadline.setHours(hours, minutes, 0, 0);
    }
  }
  
  // Handle Evening Window restriction (Sun-Thu only)
  if (hasRestriction) {
    while (!isEveningWindowDay(deadline)) {
      deadline = getNextBusinessDay(deadline);
      deadline.setHours(hours, minutes, 0, 0);
    }
  }
  
  return deadline;
}

// Format countdown time
function formatCountdown(milliseconds) {
  if (milliseconds <= 0) return '00:00:00';
  
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Format date for display
function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/New_York'
  }) + ' ET';
}

// Update countdown timers
function updateCountdowns() {
  const now = new Date();
  
  // Same Day Windows
  achData.same_day_windows.forEach((window, index) => {
    const deadline = getNextDeadline(window.submission_deadline, false);
    const timeRemaining = deadline - now;
    
    const timerElement = document.querySelector(`#same-day-${index + 1}-timer .countdown-time`);
    const nextElement = document.querySelector(`#same-day-${index + 1}-next`);
    
    if (timerElement) {
      timerElement.textContent = formatCountdown(timeRemaining);
    }
    if (nextElement) {
      nextElement.textContent = formatDate(deadline);
    }
  });
  
  // Next Day Windows
  achData.next_day_windows.forEach((window, index) => {
    const hasRestriction = window.days_restriction !== undefined;
    const deadline = getNextDeadline(window.submission_deadline, true, hasRestriction);
    const timeRemaining = deadline - now;
    
    const timerElement = document.querySelector(`#next-day-${index + 1}-timer .countdown-time`);
    const nextElement = document.querySelector(`#next-day-${index + 1}-next`);
    
    if (timerElement) {
      timerElement.textContent = formatCountdown(timeRemaining);
    }
    if (nextElement) {
      nextElement.textContent = formatDate(deadline);
    }
  });
}

// Populate timetable
function populateTimeTable() {
  const tbody = document.getElementById('timetable-body');
  if (!tbody) return;
  
  let html = '';
  
  // Same Day Windows
  achData.same_day_windows.forEach(window => {
    const utcDeadline = convertTime(window.submission_deadline, 0, 4);
    const denverDeadline = convertTime(window.submission_deadline, 0, -2);
    const lisbonDeadline = convertTime(window.submission_deadline, 0, 5);
    
    const utcSettlement = convertTime(window.settlement_time, 0, 4);
    const denverSettlement = convertTime(window.settlement_time, 0, -2);
    const lisbonSettlement = convertTime(window.settlement_time, 0, 5);
    
    html += `
      <tr>
        <td class="window-name">${window.name}</td>
        <td><span class="window-type-cell same-day-type">Same Day</span></td>
        <td class="time-cell deadline-time">${window.submission_deadline}</td>
        <td class="time-cell settlement-time">${window.settlement_time}</td>
        <td class="time-cell">${utcDeadline} / ${utcSettlement}</td>
        <td class="time-cell">${denverDeadline} / ${denverSettlement}</td>
        <td class="time-cell">${window.submission_deadline} / ${window.settlement_time}</td>
        <td class="time-cell">${lisbonDeadline} / ${lisbonSettlement}</td>
      </tr>
    `;
  });
  
  // Next Day Windows
  achData.next_day_windows.forEach(window => {
    const utcDeadline = convertTime(window.submission_deadline, 0, 4);
    const denverDeadline = convertTime(window.submission_deadline, 0, -2);
    const lisbonDeadline = convertTime(window.submission_deadline, 0, 5);
    
    const utcSettlement = convertTime(window.settlement_time, 0, 4);
    const denverSettlement = convertTime(window.settlement_time, 0, -2);
    const lisbonSettlement = convertTime(window.settlement_time, 0, 5);
    
    html += `
      <tr>
        <td class="window-name">${window.name}</td>
        <td><span class="window-type-cell next-day-type">Next Day</span></td>
        <td class="time-cell deadline-time">${window.submission_deadline}</td>
        <td class="time-cell settlement-time">${window.settlement_time}+1</td>
        <td class="time-cell">${utcDeadline} / ${utcSettlement}+1</td>
        <td class="time-cell">${denverDeadline} / ${denverSettlement}+1</td>
        <td class="time-cell">${window.submission_deadline} / ${window.settlement_time}+1</td>
        <td class="time-cell">${lisbonDeadline} / ${lisbonSettlement}+1</td>
      </tr>
    `;
  });
  
  tbody.innerHTML = html;
}

// Initialize application
function init() {
  // Populate the timetable
  populateTimeTable();
  
  // Start countdown updates
  updateCountdowns();
  
  // Update every second
  setInterval(updateCountdowns, 1000);
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', init);