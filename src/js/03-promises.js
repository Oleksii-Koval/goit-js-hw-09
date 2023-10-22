import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', handlerForm);


function handlerForm(event) {
  event.preventDefault();
  const { amount, delay, step } = event.target.elements;
  const inputAmount = Number(amount.value);
  const inputDelay = Number(delay.value);
  const inputStep = Number(step.value);

  for (let i = 1; i <= inputAmount; i += 1){
  const delays = (inputDelay + inputStep * i) - inputStep;
  let position = i;
  createPromise(position, delays)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch (({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  };
 
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      
      if (shouldResolve) {
       resolve({ position, delay })
      } else {
       reject({ position, delay })
      }
   }, delay)
  })
}


