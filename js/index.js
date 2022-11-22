import userComment from '/js/component/userComment';
import { postComments, getComments, deleteMyDB } from '/js/idb/indexedDB';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((reg) => console.log('Success: ', reg.scope))
      .catch((err) => console.log('Failure: ', err));
  });
}

window.customElements.define('user-comment', userComment);

const container = document.querySelector('.main_container');
const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const comment = document.querySelector('#comment');
const checkbox = document.querySelector('#input-checkbox');
const clearButton = document.querySelector('#clear_bnt');

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
  const data = new Date().toString().slice(0, 15);
  if (
    !usernameValue ||
    !emailValue ||
    !isValidEmail(emailValue) ||
    commentValue.length <= 30 ||
    !checkbox.checked
  ) {
    validateInputs(usernameValue, emailValue, commentValue);
  } else {
    const commentData = { usernameValue, emailValue, commentValue, data };
    postComments(commentData, emailValue);
    window.location.reload();
  }
});

clearButton.addEventListener('click', () => {
  deleteMyDB();
  window.location.reload();
});

getComments(container);

(async () => {
  // create and show the notification
  const showNotification = () => {
    // create a new notification
    const notification = new Notification('Tesfaye Portfolio', {
      body: 'Click here to see my portfolio',
      icon: '/images/logo_192.png',
    });

    // close the notification after 10 seconds
    setTimeout(() => {
      notification.close();
    }, 10 * 1000);

    // navigate to a URL when clicked
    notification.addEventListener('click', () => {
      window.open('https://tesfayeeshetie.com/', '_blank');
    });
  };

  // show an error message
  const showError = () => {
    const error = document.querySelector('.error');
    error.style.display = 'block';
    error.textContent = 'You blocked the notifications';
  };

  // check notification permission
  let granted = false;

  if (Notification.permission === 'granted') {
    granted = true;
  } else if (Notification.permission !== 'denied') {
    let permission = await Notification.requestPermission();
    granted = permission === 'granted' ? true : false;
  }

  // show notification or error
  granted ? showNotification() : showError();
})();
