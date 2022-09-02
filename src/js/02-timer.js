import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function windowAlert() {
  window.alert('Please choose a date in the future"');
}

const btnStart = document.querySelector('[data-start]');
const daysData = document.querySelector('span[data-days]');
const hoursData = document.querySelector('span[data-hours]');
const minutesData = document.querySelector('span[data-minutes]');
const secondsData = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectDate = selectedDates[0].getTime();
    currentDate = options.defaultDate.getTime();
    btnStart.disabled = true;
    if (selectedDates[0] < options.defaultDate) {
      windowAlert();
    } else {
      btnStart.disabled = false;
    }
  },
};

const fp = flatpickr('#datetime-picker', options); // flatpickr

let currentDate = null;
let selectDate = null;
let startTime = null;
let intervalId = null;

btnStart.addEventListener('click', () => {
  countDownTimer();
});

function countDownTimer() {
  startTime = selectDate - currentDate;
  intervalId = setInterval(() => {
    (startTime -= 1000), onStartTime(), updateTime();
  }, 1000);
}

function onStartTime() {
  if (startTime <= 0) {
    clearInterval(intervalId);
  }
}
function updateTime() {
  const { days, hours, minutes, seconds } = convertMs(startTime);
  daysData.textContent = days;
  hoursData.textContent = hours;
  minutesData.textContent = minutes;
  secondsData.textContent = seconds;
}

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