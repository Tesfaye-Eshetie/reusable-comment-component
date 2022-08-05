import userComment from './user-component/userComment';
import { createStore, postComments, getComments } from './idb/indexedDB';

createStore();

window.customElements.define('user-comment', userComment);

const container = document.querySelector('.main_container');
const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const comment = document.querySelector('#comment');
const checkbox = document.querySelector('#input-checkbox');

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

const isValidEmail = (mail) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(mail).toLowerCase());
};

const validateInputs = (usernameValue, emailValue, commentValue) => {
  if (usernameValue === '') {
    setError(username, 'Username is required');
  } else {
    setSuccess(username);
  }

  if (emailValue === '') {
    setError(email, 'Email is required');
  } else if (!isValidEmail(emailValue)) {
    setError(email, 'Provide a valid email address');
  } else {
    setSuccess(email);
  }

  const required = 30;
  const left = required - commentValue.length;
  if (left === 30) {
    setError(comment, 'Comments is required');
  } else if (left > 0) {
    setError(comment, `${left} more characters required`);
  } else {
    setSuccess(comment);
  }

  if (!checkbox.checked) {
    setError(checkbox, "Can't proceed as you didn't agree to the terms!");
  } else {
    setSuccess(checkbox);
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const commentValue = comment.value.trim();
  if (
    !usernameValue ||
    !emailValue ||
    !isValidEmail(emailValue) ||
    commentValue.length <= 30 ||
    !checkbox.checked
  ) {
    validateInputs(usernameValue, emailValue, commentValue);
  } else {
    postComments(usernameValue, emailValue, commentValue);

    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }
});

getComments(container);
