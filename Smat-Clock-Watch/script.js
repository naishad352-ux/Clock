// --- PAGE VIEW NAVIGATION SYSTEM ---
function showPage(pageId, navButton) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(nav => nav.classList.remove('active'));
    navButton.classList.add('active');
}

// --- LIGHT & DARK THEME SWITCHER ---
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.body.removeAttribute('data-theme');
        themeBtn.innerHTML = '<span class="mode-icon">🌙</span> <span class="btn-text">Dark Mode</span>';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeBtn.innerHTML = '<span class="mode-icon">☀️</span> <span class="btn-text">Light Mode</span>';
    }
});

// --- OFFLINE AUDIO SYSTEM (FIXES NO SOUND ERROR) ---
function playSystemBeep(frequency = 440, duration = 1) {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.value = frequency; 
        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime); 

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.log("Audio not allowed yet by user interaction");
    }
}

function playSelectedTriggerSound(typeId) {
    const selectedSound = document.getElementById(typeId).value;
    if (selectedSound === 'beep1') {
        playSystemBeep(600, 0.8);
    } else {
        playSystemBeep(880, 1.2);
    }
}

// --- OPTIMIZED CLOCK CONTROLLER LOOP ---
// Cached DOM references to prevent high interval layout overhead
const domDigitalClock = document.getElementById('digitalClock');
const domDateDisplay = document.getElementById('dateDisplay');
const domSecond = document.getElementById('second');
const domMinute = document.getElementById('minute');
const domHour = document.getElementById('hour');
const domIndiaTime = document.getElementById('indiaTime');
const domLondonTime = document.getElementById('londonTime');
const domNewYorkTime = document.getElementById('newYorkTime');

function updateClocks() {
    const now = new Date();

    domDigitalClock.innerText = now.toLocaleTimeString('en-US', { hour12: false });
    domDateDisplay.innerText = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const secs = now.getSeconds();
    const mins = now.getMinutes();
    const hrs = now.getHours();

    domSecond.style.transform = `rotate(${secs * 6}deg)`;
    domMinute.style.transform = `rotate(${mins * 6 + secs * 0.1}deg)`;
    domHour.style.transform = `rotate(${hrs * 30 + mins * 0.5}deg)`;

    // Lazy load string formatting to prevent interval lag
    domIndiaTime.innerText = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' });
    domLondonTime.innerText = now.toLocaleTimeString('en-US', { timeZone: 'Europe/London' });
    domNewYorkTime.innerText = now.toLocaleTimeString('en-US', { timeZone: 'America/New_York' });

    checkAlarm(now);
}
setInterval(updateClocks, 1000);

// --- COUNTDOWN TIMER MODULE ---
let timerInterval;
let timerTotalSeconds = 0;

document.getElementById('startTimerBtn').addEventListener('click', () => {
    if (timerTotalSeconds === 0) {
        const h = parseInt(document.getElementById('hours').value) || 0;
        const m = parseInt(document.getElementById('minutes').value) || 0;
        const s = parseInt(document.getElementById('seconds').value) || 0;
        timerTotalSeconds = (h * 3600) + (m * 60) + s;
    }

    if (timerTotalSeconds <= 0) return;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timerTotalSeconds--;
        
        let hrs = Math.floor(timerTotalSeconds / 3600);
        let mins = Math.floor((timerTotalSeconds % 3600) / 60);
        let secs = timerTotalSeconds % 60;

        document.getElementById('timerDisplay').innerText = 
            `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        if (timerTotalSeconds <= 0) {
            clearInterval(timerInterval);
            playSelectedTriggerSound('timerSound');
            saveRecentTimer();
        }
    }, 1000);
});

document.getElementById('pauseTimerBtn').addEventListener('click', () => clearInterval(timerInterval));
document.getElementById('resetTimerBtn').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerTotalSeconds = 0;
    document.getElementById('timerDisplay').innerText = "00:00:00";
});

function saveRecentTimer() {
    const h = document.getElementById('hours').value || 0;
    const m = document.getElementById('minutes').value || 0;
    const s = document.getElementById('seconds').value || 0;
    const container = document.getElementById('recentTimers');
    if (container.innerText === "No Recent Timers") container.innerText = "";
    container.innerHTML += `<div>⏱️ Elapsed: ${h}h ${m}m ${s}s</div>`;
}

document.getElementById('clearRecentBtn').addEventListener('click', () => {
    document.getElementById('recentTimers').innerText = "No Recent Timers";
});

// --- PERFORMANCE STOPWATCH MODULE ---
let stopwatchInterval;
let swTime = 0; 

document.getElementById('startStopwatchBtn').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = setInterval(() => {
        swTime += 10;
        let ms = Math.floor((swTime % 1000) / 10);
        let s = Math.floor((swTime / 1000) % 60);
        let m = Math.floor((swTime / 60000) % 60);
        let h = Math.floor(swTime / 3600000);

        document.getElementById('stopwatchDisplay').innerText = 
            `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
    }, 10);
});

document.getElementById('pauseStopwatchBtn').addEventListener('click', () => clearInterval(stopwatchInterval));
document.getElementById('resetStopwatchBtn').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    swTime = 0;
    document.getElementById('stopwatchDisplay').innerText = "00:00:00:00";
    document.getElementById('lapHistory').innerText = "No Laps Recorded";
});

document.getElementById('lapBtn').addEventListener('click', () => {
    const currentDisplay = document.getElementById('stopwatchDisplay').innerText;
    const history = document.getElementById('lapHistory');
    if (history.innerText === "No Laps Recorded") history.innerText = "";
    history.innerHTML += `<div>🏁 Lap: ${currentDisplay}</div>`;
});

// --- ALARM SCHEDULER LOGIC ---
let activeAlarmTime = null;

document.getElementById('setAlarmBtn').addEventListener('click', () => {
    const alarmInput = document.getElementById('alarmTime').value;
    if (!alarmInput) return alert("Please select a valid time!");
    
    activeAlarmTime = alarmInput;
    document.getElementById('alarmStatus').innerText = `🔔 Alarm scheduled for ${alarmInput}`;
});

document.getElementById('cancelAlarmBtn').addEventListener('click', () => {
    activeAlarmTime = null;
    document.getElementById('alarmStatus').innerText = "No Alarm Set";
});

function checkAlarm(now) {
    if (!activeAlarmTime) return;
    
    const currentHrsMins = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    if (currentHrsMins === activeAlarmTime) {
        playSelectedTriggerSound('alarmSound');
        activeAlarmTime = null; 
        document.getElementById('alarmStatus').innerText = "Alarm Triggered!";
    }
}
