import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectors = {
    inputEl: document.querySelector('[id="datetime-picker"]'),
    buttonEl: document.querySelector('[data-start]'),
    spansEl: document.querySelectorAll('.value'),
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]'),
    containerEl: document.querySelector('.timer'),
};

selectors.buttonEl.addEventListener('click', handlerStart);

selectors.buttonEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onOpen() {
      require("flatpickr/dist/themes/confetti.css");
  },
  onClose([selectedDates]) {
      const currentDate = Date.now();

      if (selectedDates[0] < currentDate) {
          Notify.failure('Please choose a date in the future');  
          selectors.buttonEl.disabled = true;
      } else {
          selectors.buttonEl.disabled = false;
          Notify.success('Press start!');
      }
    },
};

flatpickr(selectors.inputEl, options);

function handlerStart() {
    const timer = setInterval(() => {
       
    selectors.buttonEl.disabled = true;
    const selectedDay = new Date(selectors.inputEl.value);
    const currentDate = Date.now();
    const timerValue = selectedDay - currentDate;
    const { days, hours, minutes, seconds } = convertMs(timerValue);
        
        

    if (timerValue > 0) {
     updateTimerDisplay( days, hours, minutes, seconds ) 
    } else {
    clearInterval(timer);
     selectors.spansEl.textContent = '00';
     selectors.buttonEl.disabled = false;
    }
    }, 1000);
}  

function updateTimerDisplay( days, hours, minutes, seconds ) {
    selectors.daysEl.textContent = addLeadingZero(days);
    selectors.hoursEl.textContent = addLeadingZero(hours);
    selectors.minutesEl.textContent = addLeadingZero(minutes);
    selectors.secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


selectors.containerEl.style.display = 'flex';
selectors.containerEl.style.gap = '25px';
selectors.containerEl.style.paddingTop = '20px';         
selectors.containerEl.style.color = 'orange';
selectors.containerEl.style.fontSize = '20px';

