import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonStart = document.querySelector('[data-start]');
const daysCount = document.querySelector('[data-days]');
const hoursCount = document.querySelector('[data-hours]');
const minutesCount = document.querySelector('[data-minutes]');
const secondsCount = document.querySelector('[data-seconds]');
const INTERVAL_DELAY = 1000;
let timerId;

buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr, instance) {
    if (selectedDates[0] <= instance.config.defaultDate) {
      return Notify.failure('Please choose a date in the future');
    }
    buttonStart.disabled = false;
  },
};

const datePicker = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const onClick = () => {
  const selectedDate = datePicker.selectedDates[0];
  const currentDate = new Date();
  let intervalMs = selectedDate - currentDate;
  addLeadingZero(convertMs(intervalMs));

  timerId = setInterval(() => {
    const differentValue = convertMs(intervalMs);

    if (intervalMs < INTERVAL_DELAY) {
      clearTimeout(timerId);
    }

    intervalMs -= INTERVAL_DELAY;

    addLeadingZero(differentValue);
  }, INTERVAL_DELAY);
};

buttonStart.addEventListener('click', onClick);

function addLeadingZero(value) {
  daysCount.textContent = value.days.toString().padStart(2, '0');
  hoursCount.textContent = value.hours.toString().padStart(2, '0');
  minutesCount.textContent = value.minutes.toString().padStart(2, '0');
  secondsCount.textContent = value.seconds.toString().padStart(2, '0');
}
