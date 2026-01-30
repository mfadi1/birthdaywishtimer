const nameEl = document.getElementById('name');
const statusEl = document.getElementById('status');
const ageEl = document.getElementById('age');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const messageEl = document.getElementById('message');
const revealBtn = document.getElementById('revealBtn');

nameEl.textContent = CONFIG.name;
messageEl.textContent = CONFIG.birthdayMessage;

function calculateAge(currentYear, currentMonth, currentDay) {
    let age = currentYear - CONFIG.birthYear;
    
    // If birthday hasn't occurred this year yet, subtract 1
    if (currentMonth < CONFIG.birthMonth - 1 || 
        (currentMonth === CONFIG.birthMonth - 1 && currentDay < CONFIG.birthDay)) {
        age--;
    }
    
    return age;
}

function getNextBirthday() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const birthday = new Date(currentYear, CONFIG.birthMonth - 1, CONFIG.birthDay);
    
    if (now > birthday) {
        birthday.setFullYear(currentYear + 1);
    }
    
    return birthday;
}

function isBirthday() {
    const now = new Date();
    return now.getMonth() === CONFIG.birthMonth - 1 && 
           now.getDate() === CONFIG.birthDay;
}

function updateCountdown() {
    const now = new Date();
    const nextBirthday = getNextBirthday();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();
    
    const currentAge = calculateAge(currentYear, currentMonth, currentDay);
    
    if (isBirthday()) {
        statusEl.textContent = "TODAY'S THE DAY";
        ageEl.textContent = currentAge;
        document.getElementById('countdown').style.display = 'none';
        revealBtn.classList.remove('hidden');
    } else {
        const diff = nextBirthday - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const nextAge = currentAge + 1;
        
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
        
        statusEl.textContent = `UNTIL ${nextAge}`;
        ageEl.textContent = nextAge;
        document.getElementById('countdown').style.display = 'grid';
        revealBtn.classList.add('hidden');
        messageEl.classList.remove('show');
    }
}

revealBtn.addEventListener('click', () => {
    messageEl.classList.add('show');
    revealBtn.classList.add('hidden');
});

updateCountdown();
setInterval(updateCountdown, 1000);
