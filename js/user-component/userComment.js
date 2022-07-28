const template = document.createElement('template');
template.innerHTML = `
  <div>
    <h3></h3>
    <h4></h4>
    <p></p>
  </div>`;

class userComment extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector(
      'h3'
    ).textContent = `Name: ${this.getAttribute('name')} `;
    this.shadowRoot.querySelector(
      'h4'
    ).textContent = `Email: ${this.getAttribute('email')}  `;
    this.shadowRoot.querySelector(
      'p'
    ).textContent = `Comment: ${this.getAttribute('comment')} `;
  }
}

export default userComment;
