import { Notify } from 'notiflix/build/notiflix-notify-aio';

const createForm = document.querySelector('.form');
createForm.addEventListener('submit', onCreate);

function onCreate(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const amountCallPromise = form.elements.amount.value;
  const stepPromise = form.elements.step.value;
  const delayPromise = form.elements.delay.value;
  let position = 1;
  let delay = Number(delayPromise);

  for (let i = 0; i < amountCallPromise; i++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += Number(stepPromise);
    position += 1;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
