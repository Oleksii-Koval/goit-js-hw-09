import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectors = {
    inputEl: document.querySelector('[id="datetime-picker"]'),
    buttonEl: document.querySelector('[data-start]'),
    timerEl: document.querySelector('.timer'),
};

selectors.buttonEl.addEventListener('click', handlerStart);

selectors.buttonEl.disabled = true;
let selectedDateArr = [];

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);

      const currentDate = new Date();
      if (selectedDates[0] - currentDate < 0) {
          Notify.failure('Please choose a date in the future');  
          selectedDates = [];
          selectors.buttonEl.disabled = true;
      } else {
          selectors.buttonEl.disabled = false;
          Notify.success('Press start!');
      }
      selectedDateArr = [];
      selectedDateArr.push(selectedDates[0]);
    },
};

flatpickr(selectors.inputEl, options);

 

function handlerStart() {
    if (selectedDateArr.length === 0) {
        return;
    } else {
        const selectedDay = selectedDateArr[0];
        console.log('selectedDay', selectedDay);
    }
        
     
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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(5524140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}