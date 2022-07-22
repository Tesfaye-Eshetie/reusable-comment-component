const container = document.querySelector('.main-container');
const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const comment = document.querySelector('#comment');

const usernameValue = username.value.trim();
const emailValue = email.value.trim();
const commentValue = comment.value.trim();
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

const validateInputs = () => {
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
};

const template = document.createElement('template');
template.innerHTML = `<style> p{color:red;</style> <div>
<h3></h3>
<h4></h4>
<p></p>
</div>`;

class userComment extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector(
      'h3'
    ).textContent = `Name: ${this.getAttribute('name')} `;
    this.shadowRoot.querySelector(
      'h4'
    ).textContent = `Email: ${this.getAttribute('email')}  `;
    this.shadowRoot.querySelector(
      'p'
    ).textContent = `Comment: ${this.getAttribute('comment')} `;

    this.innerHTML = ``;
  }
}
window.customElements.define('user-comment', userComment);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  validateInputs();
  const addComment = document.createElement('user-comment');
  addComment.setAttribute('name', usernameValue);
  addComment.setAttribute('email', emailValue);
  addComment.setAttribute('comment', commentValue);
  container.insertBefore(addComment, form);
});
